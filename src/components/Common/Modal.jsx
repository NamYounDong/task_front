import React, { useEffect, useState } from 'react'
import '../../utils/utils'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlices';
import { getTasks, initTaskData, insertTask, setTaskData, updateTask } from '../../redux/slices/apiSlices';
import { toast } from 'react-toastify';

const Modal = () => {
    const modalType = useSelector(state => state.modal.modalType);
    const dispatch = useDispatch();

    // OPEN MODAL REDUX 처리 방법
    const taskData = useSelector(state => state.api.taskData);


    const { id, userId, title, date, description, isCompleted, isImportant } = taskData;


    const showModalContents = (modalType, str1, str2, str3) => {
        switch (modalType) {
            case 'create' :
                return str1;
            case 'update' :
                return str2;
            case 'detail' :
                return str3;
            default : 
                return str3;
        }
    };

    const modalTitle  = showModalContents(
        modalType,
        '등록',
        '수정',
        '상세보기'
    );


    const modalBtn  = showModalContents(
        modalType,
        '등록',
        '수정',
    );


    const handleCloseModal = () => {
        dispatch(setTaskData(initTaskData)); // 모달 데이터 초기화
        dispatch(closeModal()); // 모달 오픈 여부 false 처리
    }

    const [formData, setFormData] = useState(taskData);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name] : (type == 'checkbox' ? checked : value)
        }));
    } 

    const user = useSelector(state => state.auth.authData);

    const handleSave = async (e) => {
        e.preventDefault();
        try {

            if(!user?.sub){
                toast.error('잘못된 사용자 입니다.')
                return;
            }
            if(!formData?.title){
                toast.error('제목을 입력해주세요.')
                return;
            }
            if(!formData?.description){
                toast.error('내용을 입력해주세요.')
                return;
            }

            const options = {
                method : 'POST',
                body : formData
            }
            if(modalType == 'create'){
                options.body.userId = user.sub;
                await dispatch(insertTask(options)).unwrap();
                toast.success('TODO 추가!');
            }else if(modalType == 'update'){
                await dispatch(updateTask(options)).unwrap();
                toast.success('TODO 수정!');
            }
            await dispatch(getTasks()).unwrap();
            
            handleCloseModal(); // 완료 후 모달 닫기
        } catch (error) {
            console.log(`error : ${error.message}`)
            toast.error(`error : ${error.message}`);
        }


    }


    return (
        <div className="modal fixed bg-black bg-opacity-50 flex items-center justify-center w-full h-full left-0 top-0 z-50">
            <div className="form-wrapper bg-gray-700 rounded-md w-1/2 flex flex-col items-center relative p-4">
                <h2 className='text-2xl py-2 border-b border-gray-300 w-fit font-semibold'>JUST-! DO IT!!{`(${modalTitle}!!)`}</h2>
                <form className="w-full" onSubmit={handleSave}>
                    
                    <input type="hidden" id="id" name="id" value={id}/>
                    <input type="hidden" id="userId" name="userId" value={userId}/>

                    <div className="input-control">
                        <label htmlFor="title">제목</label>
                        <input type="text" id="title" name="title" value={formData.title} placeholder="제목을 입력해주세요." {...(modalType == 'detail' && {disabled : true})} onChange={handleChange}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="description">제목</label>
                        <textarea id="description" name="description" value={formData.description} placeholder="내용을 입력해주세요." {...(modalType == 'detail' && {disabled : true})} onChange={handleChange}></textarea>
                    </div>
                    <div className="input-control">
                        <label htmlFor="date">날짜</label>
                        <input type="date" id="date" name="date" value={formData.date} {...(modalType == 'detail' && {disabled : true})} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="input-control toggler w-1/2 px-2">
                            <label htmlFor="isCompleted">완료 여부</label>
                            <input type="checkbox" id="isCompleted" name="isCompleted" checked={formData.isCompleted} {...(modalType == 'detail' && {disabled : true})} onChange={handleChange}/>
                        </div>
                        <div className="input-control toggler w-1/2 px-2">
                            <label htmlFor="isImportant">중요성 여부</label>
                            <input type="checkbox" id="isImportant" name="isImportant" checked={formData.isImportant} {...(modalType == 'detail' && {disabled : true})} onChange={handleChange}/>
                        </div>
                    </div>

                    {
                        (modalType != 'detail') && (
                            <div className="submit-btn flex justify-end">
                                <button type="submit" className="flex flex-justify-end bg-black py-3 px-6 
                                    rounded-md hover:bg-slate-900">DO IT!!({modalBtn}!!)</button>
                            </div>
                        )
                    }

                    <IoMdClose className="absolute top-10 right-10 cursor-pointer" size={24} onClick={() => handleCloseModal()}/>
                </form>
            </div>
        </div>
    )
}

export default Modal
