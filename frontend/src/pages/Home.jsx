/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TravelStoryCard from "../components/Cards/TravelStoryCard";
import FilterSortBar from "../components/FilterSortBar";
import QuickStats from "../components/QuickStats";
import EmptyCard from "../components/Cards/EmptyCard";
import RecentActivityCard from "../components/Cards/RecentActivityCard";
import QuickActionsCard from "../components/Cards/QuickActionsCard";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import useStories from "./../hooks/useStories";
import useAuth from "./../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import Loader from "./../components/Loader";
import { getUserActivity } from "../services/APIs/users";
import { toggleFavourite } from "../services/APIs/stories";

const Home = () => {
  const { user } = useAuth();
  const { stories, loading, fetchStories, deleteStory } = useStories(user?.uid);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();


  // State management
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null });
  const [openViewModal, setOpenViewModal] = useState({ isShown: false, data: null });

  useEffect(() => {
    if (user?.uid) {
      fetchStories(user.uid);
    }
  }, [user?.uid]);

  useEffect(() => {
    const fetchActivity = async () => {
      if (user?.uid) {
        try {
          const data = await getUserActivity(user.uid);
          console.log("Fetched activity:", data);
          setActivities(data);
        } catch (err) {
          console.error("Failed to fetch activity:", err);
        }
      }
    };

    fetchActivity();
  }, [user?.uid]);


  // Filter and sort stories
  const filteredAndSortedStories = React.useMemo(() => {
    let filtered = [...stories];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.visitedLocation.some(location =>
          location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply category filter
    switch (filterBy) {
      case 'favorites':
        filtered = filtered.filter(story => story.isFavourite);
        break;

      case 'recent': {
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        filtered = filtered.filter(story => story.visitedDate > oneWeekAgo);
        break;
      }

      case 'month': {
        const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        filtered = filtered.filter(story => story.visitedDate > oneMonthAgo);
        break;
      }

      default:
        break;
    }


    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'favorites':
        filtered.sort((a, b) => {
          if (a.isFavourite && !b.isFavourite) return -1;
          if (!a.isFavourite && b.isFavourite) return 1;
          return b.visitedDate - a.visitedDate;
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => a.visitedDate - b.visitedDate);
        break;
      default: // recent
        filtered.sort((a, b) => b.visitedDate - a.visitedDate);
        break;
    }

    return filtered;
  }, [stories, searchQuery, filterBy, sortBy]);

  // Event handlers
  const handleEdit = (data) => setOpenAddEditModal({ isShown: true, type: "edit", data });
  const handleViewStory = (data) => setOpenViewModal({ isShown: true, data });


  // Calculate stats
  const totalStories = stories.length;
  const totalLocations = [...new Set(stories.flatMap(s => s.visitedLocation))].length;
  const totalFavorites = stories.filter(s => s.isFavourite).length;

  // Loading state
  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      {/* Enhanced Navbar */}
      <Navbar />

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-cyan-700 to-blue-700 bg-clip-text text-transparent mb-4">
            Welcome back, {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Explorer'}! ✈️
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Continue documenting your amazing adventures and inspiring fellow travelers around the world.
          </p>
        </div>

        {/* Quick Stats */}
        <QuickStats
          totalStories={totalStories}
          totalLocations={totalLocations}
          totalFavorites={totalFavorites}
        />

        {/* Filter and Sort Bar */}
        <FilterSortBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          storiesCount={filteredAndSortedStories.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {filteredAndSortedStories.length > 0 ? (
              <div className={`${viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
                : 'flex flex-col gap-4 max-w-3xl mx-auto w-full'
                }`}>
                {filteredAndSortedStories.map((story) => (
                  <TravelStoryCard
                    key={story.id}
                    imageUrl={story.imageUrl}
                    title={story.title}
                    story={story.story}
                    date={story.visitedDate}
                    visitedLocation={story.visitedLocation}
                    isFavourite={story.isFavourite}
                    author={user?.displayName || user?.email?.split('@')[0] || 'Anonymous'}
                    views={story.views || Math.floor(Math.random() * 200) + 10}
                    readTime={Math.ceil(story.story?.length / 200) || 5}
                    onEdit={() => handleEdit(story)}
                    onClick={() => handleViewStory(story)}
                    onFavouriteClick={() => toggleFavourite(story)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                message="Start creating your first travel story! Click the 'Add' button and write down your thoughts, ideas and memories. Let's get started on your journey!"
                onCreateStory={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Recent Activity */}
            <RecentActivityCard stories={activities} onSeeAll={() => navigate("/activity")} />

            {/* Quick Actions */}
            <QuickActionsCard setOpenAddEditModal={setOpenAddEditModal} />
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 },
          content: {
            inset: "fixed",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflowY: "auto",
            background: "white",
            padding: "2rem",
            borderRadius: "1rem",
          }
        }}
        appElement={document.getElementById("root")}
        className="model-box scrollbar"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          fetchStories={() => fetchStories(user.uid)}
          userId={user?.uid}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => setOpenViewModal({ isShown: false, data: null })}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 },
          content: {
            inset: "fixed",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflowY: "auto",
            background: "white",
            padding: "2rem",
            borderRadius: "1rem",
          }
        }}
        appElement={document.getElementById("root")}
        className="model-box scrollbar"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => setOpenViewModal((prev) => ({ ...prev, isShown: false }))}
          onEditClick={() => {
            setOpenViewModal((prev) => ({ ...prev, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={async () => {
            try {
              await deleteStory(openViewModal.data.id, user.uid, openViewModal.data.title);
              setOpenViewModal((prev) => ({ ...prev, isShown: false }));
              await fetchStories(user.uid);
              toast.success('Story deleted successfully');
            } catch (error) {
              toast.error('Failed to delete story', error);
            }
          }}
        />
      </Modal>

      {/* Floating Add Button */}
      <button
        className="fixed right-6 bottom-6 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 flex items-center justify-center z-50 group"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-3xl group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Floating decorative elements */}
      <div className="fixed top-1/4 left-8 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-30 animate-bounce pointer-events-none"></div>
      <div className="fixed top-3/4 right-12 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-1/4 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30 animate-bounce delay-1000 pointer-events-none"></div>
    </div>
  );
};

export default Home;
