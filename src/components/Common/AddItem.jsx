import React from 'react'
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { openModal, setModalType } from '../../redux/slices/modalSlices';

const AddItem = () => {

  const dispatch = useDispatch();
  const handleCreateOrenModal = () => {
    dispatch(setModalType('create'));
    dispatch(openModal())
}

  return (
    <div className="add-card w-1/3 h-[25vh] p-[0.25rem]">
        <div className="w-full h-full border border-gray-500 rounded-md flex py-3 items-center justify-center cursor-pointer
                hover:bg-gray-200 hover:border-gray-950 hover:border-[5px] group transition-all duration-300" onClick={() => handleCreateOrenModal()}>
            <button className="flex items-center gap-2">
                <IoAddCircleOutline className="w-8 h-8 text-gray-400 font-light group-hover:text-gray-950 group-hover:font-bold transition-all duration-300"/>
                <span className="text-gray-400 group-hover:text-gray-950 group-hover:font-bold transition-all duration-300">Just-! DO IT!</span>
            </button>
        </div>
    </div>
  )
}

export default AddItem
