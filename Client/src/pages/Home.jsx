import { useEffect, useState } from "react";
import { FiFeather } from "react-icons/fi";

import api from "../services/api";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import PostSkeleton from "../components/PostSkeleton";


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================
  // FETCH POSTS
  // =========================

  const fetchPosts = async () => {

    try {

      const response =
        await api.get("/api/posts");

      setPosts(
        response.data.posts || []
      );

    } catch (error) {

      console.error(
        "Failed to fetch posts:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchPosts();

  }, []);


  // =========================
  // POST CREATED
  // =========================

  const handlePostCreated = (newPost) => {

    setPosts((prev) => [
      newPost,
      ...prev,
    ]);

  };


  // =========================
  // DELETE POST
  // =========================

  const handleDelete = (postId) => {

    setPosts((prev) =>
      prev.filter(
        (post) =>
          post._id !== postId
      )
    );

  };


  // =========================
  // LIKE POST
  // =========================

  const handleLike = (
    postId,
    likes
  ) => {

    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes,
            }
          : post
      )
    );

  };


  return (

    <div className="min-w-0 py-6 sm:py-8 lg:py-10">

      {/* ================================= */}
      {/* HERO / INTRO */}
      {/* ================================= */}

      <section className="mb-8">

        <span
          className="
            mb-3
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-[#322F5C]
            bg-[#1C1A3B]/40
            px-3
            py-1
            font-mono-anon
            text-[11px]
            uppercase
            tracking-widest
            text-[#9B8CFF]
            backdrop-blur-sm
          "
        >

          <FiFeather size={12} />

          anonymous & unfiltered

        </span>


        <h1
          className="
            font-display
            text-3xl
            leading-tight
            text-[#F4F2FA]
            sm:text-4xl
          "
        >
          Say what you can't say out loud.
        </h1>


        <p
          className="
            mt-2
            max-w-xl
            text-sm
            leading-relaxed
            text-[#C9C5E0]
            sm:text-base
          "
        >
          A place to share your thoughts
          without revealing your identity.
        </p>

      </section>


      {/* ================================= */}
      {/* CREATE POST */}
      {/* ================================= */}

      <div className="mb-8">

        <CreatePost
          onPostCreated={
            handlePostCreated
          }
        />

      </div>


      {/* ================================= */}
      {/* COMMUNITY */}
      {/* ================================= */}

      <section>

        <div
          className="
            mb-4
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              font-mono-anon
              text-xs
              uppercase
              tracking-widest
              text-[#6C6791]
            "
          >
            Community
          </h2>


          {!loading &&
            posts.length > 0 && (

              <span
                className="
                  font-mono-anon
                  text-[10px]
                  text-[#6C6791]
                "
              >
                {posts.length}{" "}
                {posts.length === 1
                  ? "post"
                  : "posts"}
              </span>

            )}

        </div>


        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading ? (

          <div className="space-y-4">

            <PostSkeleton />

            <PostSkeleton />

            <PostSkeleton />

          </div>

        ) : posts.length === 0 ? (

          /* ================================= */
          /* EMPTY STATE */
          /* ================================= */

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-[#322F5C]
              bg-[#1C1A3B]/70
              p-10
              text-center
              backdrop-blur-sm
            "
          >

            <div
              className="
                mx-auto
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#9B8CFF]/10
                text-[#9B8CFF]
              "
            >

              <FiFeather size={20} />

            </div>


            <h3
              className="
                font-display
                text-lg
                text-[#F4F2FA]
              "
            >
              Nothing here yet.
            </h3>


            <p
              className="
                mx-auto
                mt-1
                max-w-sm
                text-sm
                text-[#9C97BE]
              "
            >
              Be the first person to
              share something with the
              community.
            </p>

          </div>

        ) : (

          /* ================================= */
          /* POSTS */
          /* ================================= */

          <div className="space-y-4">

            {posts.map((post) => (

              <PostCard
                key={post._id}
                post={post}
                onDelete={handleDelete}
                onLike={handleLike}
              />

            ))}

          </div>

        )}

      </section>

    </div>

  );

};


export default Home;