import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useStories from "../hooks/useStories";
import Navbar from "../components/Navbar";
import { MdAdd } from "react-icons/md";
import TravelStoryCard from "../components/Cards/TravelStoryCard";
import AddPost from "../components/AddPost";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../components/Cards/EmptyCard";
import EmptyImg from "../assets/Images/add-story.png";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { user } = useAuth();
  const { stories, fetchStories, deleteStory, toggleFavourite } = useStories(user?.uid);

  const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null });
  const [openViewModal, setOpenViewModal] = useState({ isShown: false, data: null });

  const handleEdit = (data) => setOpenAddEditModal({ isShown: true, type: "edit", data });
  const handleViewStory = (data) => setOpenViewModal({ isShown: true, data });

  return (
    <>
      <Navbar userInfo={user} />
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="flex-1">
            {stories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stories.map((item) => (
                  <TravelStoryCard
                    key={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onEdit={() => handleEdit(item)}
                    onClick={() => handleViewStory(item)}
                    onFavouriteClick={() => toggleFavourite(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={EmptyImg}
                message={`Start Creating your First Travel Story! Click the 'Add' button and write down your thoughts, ideas and memories. Let's get started!`}
              />
            )}
          </div>

          {/* Optional Sidebar Placeholder */}
          <div className="w-[320px] hidden lg:block" />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddPost
          title={openAddEditModal.data?.title || ""}
          setTitle={() => {}}
          storyImg={openAddEditModal.data?.imageUrl || null}
          setStoryImg={() => {}}
          story={openAddEditModal.data?.story || ""}
          setStory={() => {}}
          visitedLocation={openAddEditModal.data?.visitedLocation || []}
          setVisitedLocation={() => {}}
          visitedDate={openAddEditModal.data?.visitedDate || null}
          setVisitedDate={() => {}}
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          fetchStories={fetchStories}
          userId={user?.uid}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => setOpenViewModal({ isShown: false, data: null })}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => setOpenViewModal((prev) => ({ ...prev, isShown: false }))}
          onEditClick={() => {
            setOpenViewModal((prev) => ({ ...prev, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={async () => {
            await deleteStory(openViewModal.data.id);
            setOpenViewModal((prev) => ({ ...prev, isShown: false }));
            fetchStories();
          }}
        />
      </Modal>

      {/* Floating Add Button */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-400)] text-white shadow-lg fixed right-6 bottom-6 transition-all duration-200 hover:-translate-y-1"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px]" />
      </button>

      <ToastContainer />
    </>
  );
};

export default Home;
