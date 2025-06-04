import React, { useState } from 'react'
import '../../utils/utils';
import { MdEditDocument } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTask, getTasks, updateTask } from '../../redux/slices/apiSlices';
import { toast } from 'react-toastify';
import { openModal, setModalType } from '../../redux/slices/modalSlices';

const Item = ({ task }) => {

  const { id, title, description, createdAt, date, isCompleted, isImportant } = task;

  // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
  // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.

  const user = useSelector(state => state.auth.authData);
  const dispatch = useDispatch();
  const { sub } = user || {};

  const [completed, setIsCompleted] = useState(isCompleted);
  const changeIsCompleted = async () => {
      
      const newCompleted = !completed;
      const params = {
        id : id,
        userId : sub,
        isCompleted : newCompleted
      }

      const options = {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(params)
      };

      try {
        await dispatch(updateTask(options)).unwrap();

        newCompleted ? toast.success('Task completed') : toast.success('Task not completed');
        
        await dispatch(getTasks({type : 'POST', body : {userId : sub}})).unwrap();
      } catch (error) {
        toast.error("상태변경에러");
      }
  }

  const handleOpenModal = async (type) => {
      try {
        const options = {
            method : 'post',
            body : {id : id},
        }
        const response = await dispatch(getTask(options)).unwrap();
        dispatch(setModalType(type));
        dispatch(openModal());
      } catch (error) {
          toast.error('데이터 조회 중 에러가 발생하였습니다.');
          console.log(`getTask response Error : ${error.message}`)
      }
  }
  
  const handleDeleteTask = () => {
      if(!user){
          toast.error('잘못된 사용자 접근입니다.');
          return;
      }

      const deleteYn = confirm("삭제 하시겠습니까?");
      if(deleteYn){
          try {
            const deleteTaskData = async () => {
                const options = {
                    method:'get',
                    pathParam : [id]
                }
                await dispatch(deleteTask(options)).unwrap();
                await dispatch(getTasks()).unwrap();
              }
              deleteTaskData();
          } catch (error) {
              toast.error('일정 삭제 중 에러가 발생하였습니다.');
              console.log(`deleteTask response Error : ${error.message}`)
          }
      }
  }
  
  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
        <div className='w-full h-full border border-gray-500 rounded-md flex py-3 px-4 flex-col justify-between bg-gray-950'>

            <div className="upper">
                <h2 className='text-xl font-normal mb-3 pb-2 flex justify-between relative border-b'>
                  <span className="bottom-0">{title}</span>
                  <span className="text-sm py-1 px-3 border border-gray-500 rounded-sm hover:bg-gray-600 transition-all duration-300 cursor-pointer" onClick={() => handleOpenModal('detail')}>자세히</span>
                </h2>
                <p className="w-full overflow-hidden text-ellipsis display-[-webkit-box] line-clamp-4" style={{whiteSpace: 'pre-wrap'}}>
                    {description}
                </p>
            </div>

            <div className="lower">
                <p className="text-sm mb-1">{date}</p>
                <div className="item-fotter flex justify-between">
                    <div className="item-fotter-left flex gap-2">
                        {
                          isCompleted ? (
                            <button className="block py-1 px-4 bg-green-400 text-sm text-white rounded-md" onClick={changeIsCompleted}>Completed</button>
                          ) : (
                            <button className="block py-1 px-4 bg-cyan-400 text-sm text-white rounded-md" onClick={changeIsCompleted}>InCompleted</button>
                          )
                        }
                        {
                          isImportant && (
                            <button className="block py-1 px-4 bg-red-500 text-sm text-white rounded-md">Important</button>
                          )
                        }
                    </div>
                    <div className="item-fotter-right flex gap-2">
                        <button>
                            <MdEditDocument className="w-5 h-5" onClick={() => handleOpenModal('update')}/>
                        </button>
                        <button>
                            <FaTrash onClick={() => handleDeleteTask()}/>
                        </button>
                    </div>
                </div>
            </div>




        </div>
    </div>
  )
}

export default Item
