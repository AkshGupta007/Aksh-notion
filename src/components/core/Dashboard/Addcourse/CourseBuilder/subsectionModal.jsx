import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Upload from "./Upload";
import { RxCross1 } from "react-icons/rx";
import {
  CreateSubSection,
  UpdateSubSection,
} from "../../../../../Services/CourseApi";
import { setCourse } from "../../../../../slices/Courseslice";

const SubSectionModal = ({
  modalData,
  setModalData,
  edit = false,
  view = false,
  add = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const courseID = course._id;

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.video); // ✅ fixed: was modalData.videoUrl
    }
  }, [modalData, view, edit, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.video // ✅ fixed: was modalData.videoUrl
    );
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    formData.append("courseID", courseID);
    if (currentValues.lectureTitle !== modalData.title)
      formData.append("title", currentValues.lectureTitle);
    if (currentValues.lectureDesc !== modalData.description)
      formData.append("description", currentValues.lectureDesc);
    if (currentValues.lectureVideo !== modalData.video)
      // ✅ fixed: was modalData.videoUrl
      formData.append("video", currentValues.lectureVideo);

    setLoading(true);
    const result = await UpdateSubSection(formData, token);
    if (result) dispatch(setCourse(result));
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made");
        return;
      }
      await handleEditSubSection();
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("courseID", courseID);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    setLoading(true);
    const result = await CreateSubSection(formData, token);
    if (result) {
      dispatch(setCourse(result));
      toast.success("Lecture added");
    }
    setModalData(null);
    setLoading(false);
  };

  const heading = view ? "View lecture" : edit ? "Edit lecture" : "Add lecture";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
            {heading}
          </h2>
          <button
            onClick={() => {
              if (!loading) setModalData(null);
            }}
            className="rounded-md p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Video upload */}
          <div className="rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 p-5">
            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.video : null} // ✅ fixed: was modalData.videoUrl
              editData={edit ? modalData.video : null} // ✅ fixed: was modalData.videoUrl
            />
          </div>

          {/* Lecture Title */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lectureTitle"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Lecture title <span className="text-red-500">*</span>
            </label>
            <input
              id="lectureTitle"
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
              disabled={view}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-60"
            />
            {errors.lectureTitle && (
              <span className="text-xs text-red-500">
                Lecture title is required
              </span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lectureDesc"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Lecture description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter lecture description"
              {...register("lectureDesc", { required: true })}
              disabled={view}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 min-h-[110px] resize-y disabled:opacity-60"
            />
            {errors.lectureDesc && (
              <span className="text-xs text-red-500">
                Lecture description is required
              </span>
            )}
          </div>

          {/* Footer buttons */}
          {!view && (
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (!loading) setModalData(null);
                }}
                className="rounded-md border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-zinc-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
              >
                {loading ? "Saving..." : edit ? "Save changes" : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
