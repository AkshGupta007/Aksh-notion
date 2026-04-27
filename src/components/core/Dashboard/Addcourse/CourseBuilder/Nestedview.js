import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../Services/CourseApi";
import SubSectionModal from "./subsectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { setCourse } from "../../../../../slices/Courseslice";

const Nestedview = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
 const [loading, setloading] = useState(false);

  // ✅ Delete Section
  const handleDeleteSection = async (sectionId) => {
    try {
      setloading(true);
      const result = await deleteSection(sectionId, course._id, token);
      if (result) dispatch(setCourse(result));
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
      setConfirmationModal(null);
    }
  };

  // ✅ Delete Subsection
  const handleDeleteSubSection = async (sectionID, subsectionID) => {
    try {
      setloading(true);
      const result = await deleteSubSection(
        course._id,
        subsectionID,
        sectionID,
        token,
      );
      if (result) dispatch(setCourse(result));
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
      setConfirmationModal(null);
    }
  };

  return (
    <div className="mb-5 mt-6">
      <div className="text-white">
        {course?.coursecontent?.map((section) => (
          <details key={section._id}>
            <summary className="flex items-center justify-between gap-2 border-b-2 cursor-pointer">
              <div className="flex items-center gap-2">
                <RxDropdownMenu />
                <span>{section.sectionName}</span>
              </div>

              {/* EDIT */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // ✅ prevent toggle
                  handleChangeEditSectionName(section.sectionName, section._id);
                }}
              >
                <BiEditAlt />
              </button>

              {/* DELETE SECTION */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmationModal({
                    text1: "Delete this Section",
                    text2: "All lectures in this section will be deleted",
                    btn1text: "Delete",
                    btn2text: "Cancel",
                    btn1handler: () => handleDeleteSection(section._id),
                    btn2handler: () => setConfirmationModal(null),
                  });
                }}
                className="text-red-600 hover:text-red-800"
              >
                <RiDeleteBinLine />
              </button>

              {/* ADD LECTURE */}
              <button
                type="button"
                className="text-yellow-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setAddSubSection(section._id);
                }}
              >
                + Add Lecture
              </button>
            </summary>

            {/* SUBSECTIONS */}
            <div>
              {section?.subsections?.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center justify-between gap-x-3 p-2 border-b hover:bg-gray-700 cursor-pointer"
                >
                  <span>{data.title}</span>

                  <div className="flex items-center gap-x-2">
                    {/* EDIT */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditSubSection({
                          ...data,
                          sectionId: section._id,
                        });
                      }}
                      className="text-blue-400"
                    >
                      <BiEditAlt />
                    </button>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmationModal({
                          text1: "Delete this Lecture",
                          text2: "This lecture will be permanently deleted",
                          btn1text: "Delete",
                          btn2text: "Cancel",
                          btn1handler: () =>
                            handleDeleteSubSection(section._id, data._id),
                          btn2handler: () => setConfirmationModal(null),
                        });
                      }}
                      className="text-red-500"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      {/* MODALS */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add
        />
      )}

      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view
        />
      )}

      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit
        />
      )}

      {/* CONFIRMATION */}
      {confirmationModal && <ConfirmationModal modaldata={confirmationModal} />}
    </div>
  );
};

export default Nestedview;
