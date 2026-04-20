import React from 'react'
import { useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";


import { deleteSection,deleteSubSection } from '../../../../../Services/CourseApi';

import SubSectionModal from './subsectionModal';
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { setStep,setEditCourse,setCourse} from '../../../../../slices/Courseslice'; 

export const Nestedview = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Local state for managing modals
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const[loading,setloading]=useState(false);

  const handleDeleteSection=async (sectionId)=>{

    const result =await deleteSection(sectionId,course._id,token);
    dispatch(setCourse(result));
  }

  const handleDeleteSubSection = async (sectionID, subsectionID) => {
    const result=await deleteSubSection(course._id,subsectionID,sectionID,token);
    if(result){
    dispatch(setCourse(result))}
  };

 
  return (
    <div className="mb-5 mt-6">
      <div className="text-white">
        {course?.coursecontent?.map((section) => {
          return (
            <details>
              <summary className="flex items-center justify-between gap-2 border-b-2">
                <div>
                  <RxDropdownMenu />
                  <span>{section.sectionName}</span>
                </div>

                <button
                  onClick={() => {
                    handleChangeEditSectionName(
                      section.sectionName,
                      section._id,
                    );
                  }}
                >
                  <BiEditAlt />
                </button>

                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1text: "Delete",
                      btn2text: "Cancel",
                      btn1handler: () => handleDeleteSection(section._id),
                      btn2handler: () => setConfirmationModal(null),
                    });
                  }}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800"
                >
                  <RiDeleteBinLine /> Delete Section
                </button>

                <button>*</button>

                <button
                  className="text-yellow-400"
                  onClick={() => setAddSubSection(section._id)}
                >
                  + Add Lecture
                </button>
              </summary>

              <div>
                {section.subsections.map((data) => (
                  <div
                    key={data?._id}
                    onClick={() => setViewSubSection(data)}
                    className="flex items-center justify-between gap-x-3 p-2 border-b hover:bg-gray-50 cursor-pointer"
                  >
                    {/* Subsection title */}
                    <span className="font-medium text-gray-700">
                      {data.title}
                    </span>

                    {/* Action buttons */}
                    <div className="flex items-center gap-x-2">
                      {/* Edit button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditSubSection({
                            ...data,
                            sectionId: section._id,
                          });
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <BiEditAlt />
                      </button>

                      {/* Delete button with confirmation modal */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmationModal({
                            text1: "Delete this Section",
                            text2:
                              "All the lectures in this section will be deleted",
                            btn1text: "Delete",
                            btn2text: "Cancel",
                            btn1handler: () =>
                              handleDeleteSubSection(section._id,data._id),
                            btn2handler: () => setConfirmationModal(null),
                          });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>

      {/* SubSection Modals */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modaldata={confirmationModal} />}
    </div>
  );
}

export default Nestedview
