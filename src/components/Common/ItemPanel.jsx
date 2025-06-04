import React, { useEffect, useState } from 'react'
import Item from './Item'
import { useSelector, useDispatch } from 'react-redux';
import AddItem from './addItem';
import PageTitle from './PageTitle';
import { getTasks, setItemsData } from '../../redux/slices/apiSlices';
import { SkeletonTheme } from 'react-loading-skeleton';
import LoadingSkeleton from './LoadingSkeleton';
import Modal from './Modal';

const ItemPanel = ({pageTitle, filteredCompleted, filteredImportant}) => {

    const user = useSelector(state => state.auth.authData);
    const userKey = user?.sub;


    const getItemsData = useSelector(state => state.api.getItemsData);
    const dispatch = useDispatch();
    
    
    const [loading, setLoading] = useState(false);

    const isModalOpen = useSelector(state => state.modal.isModalOpen);
    
    // useEffect 내부에서 dispatch 함수를 호출할 때는 async/await를 사용할 수 없을때 unwrap()을 사용;
    useEffect(() => {
        const getTasksData = async () => {
            try {
                setLoading(true);

                const options = {
                    body : {userId : userKey},
                    // callback : (data) => {
                    //     dispatch(setItemsData(data)); // 콜백으로 처리 테스트
                    // }
                }
                const response = await dispatch(getTasks(options)).unwrap();
            } catch (error) {
                console.log(`Failed to get tasks: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
        getTasksData();
    }, [dispatch, userKey]);


    // 1. home 메뉴를 서택할 때:
    // - all메뉴를 선택하면 첫번째 filter 조건이 true이므로 모든 task를 반환
    // - 1번에서 반환된 모든 tasks를 대상으로 두번째 filter 조건을 적용
    // - filterImportant가 undefined이면 조건이 true 이므로 모든 task를 반환


    // 2. Completed 메뉴를 선택할 때:
    // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
    // - filterCompleted가 true이면 task.iscompleled가 true인 task만 반환


    // 3. Proceeding 메뉴를 선택할 때:
    // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
    // - filterCompleted가 false이면 task.iscompleled가 false인 task만 반환


    // 4. Important 메뉴를 선택할 때:
    // - 첫번째 필터 조건에서 if문이 true이므로 두번째 필터 조건으로 이동
    // - 두번째 filter 조건에서 filterImportant가 없으면 true이므로 모든 task를 반환(home, Completed, Proceeding과 동일)
    // - filterImportant가 true이면 task.isimportant가 true인 task만 반환


    // 왜 굳이? 그냥 공부겸? 왜 DB 조건으로 처리하지 않지?
    const filteredTasks = getItemsData?.filter((task) => {
        if(filteredCompleted == 'all') return true;
        return filteredCompleted ? task.isCompleted : !task.isCompleted;
    })
    .filter((task)  => {
        if(filteredImportant == undefined) return true;
        return filteredCompleted ? task.isImportant : !task.isImportant;
    })

    return (
        <div className="panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-5 px-4 overflow-y-auto">
            {
                isModalOpen && (
                    <Modal/>
                )
            }
            {
                userKey ? (
                    <div className="login-message w-full h-full">
                        <PageTitle title={pageTitle}/>
                        <div className="flex flex-wrap">
                            {
                                !loading && (
                                    filteredTasks?.map((task, idx) => {
                                        return <Item key={idx} task={task}/>
                                    })
                                )
                            }
                            {
                                loading && (
                                    filteredTasks?.map((task, idx) => {
                                        return (
                                            <SkeletonTheme baseColoor="#202020" highlightColor='#444' height='25vh'>
                                                <LoadingSkeleton/>
                                            </SkeletonTheme>
                                        )
                                    })
                                )
                            }
                            <AddItem/>
                        </div>
                    </div>
                ) : (
                    <div className="login-message w-full h-full flex flex-col items-center justify-center">
                        <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md">
                            <span className="text-sm font-semibold">로그인해야 쓸 수 있어 로그인 좀 해</span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}            

export default ItemPanel
