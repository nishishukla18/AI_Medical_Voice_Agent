// import Message from "../models/Message.js";

// const setupChatSocket = (io) => {
//   io.on("connection", (socket) => {
//     console.log(
//       "User connected:",
//       socket.id
//     );

//     socket.on(
//       "joinCommunity",
//       (userId) => {
//         socket.join("community");

//         socket.userId = userId;

//         io.to("community").emit(
//           "userJoined",
//           {
//             message: "Someone joined the community"
//           }
//         );
//       }
//     );

//     socket.on(
//       "sendMessage",
//       async ({ content }) => {
//         try {
//           if (
//             !content ||
//             !content.trim() ||
//             !socket.userId
//           ) {
//             return;
//           }

//           const message = await Message.create({
//             sender: socket.userId,
//             content: content.trim()
//           });

//           await message.populate(
//             "sender",
//             "anonymousName"
//           );

//           io.to("community").emit(
//             "newMessage",
//             message
//           );
//         } catch (error) {
//           console.error(
//             "Message error:",
//             error
//           );
//         }
//       }
//     );

//     socket.on(
//       "disconnect",
//       () => {
//         console.log(
//           "User disconnected:",
//           socket.id
//         );
//       }
//     );
//   });
// };

// export default setupChatSocket;

import Message from "../models/Message.js";

const setupChatSocket = (io) => {

  io.on("connection", (socket) => {

    console.log(
      "User connected:",
      socket.id
    );


    // ==============================
    // JOIN COMMUNITY
    // ==============================

    socket.on(
      "joinCommunity",
      async (userId) => {

        try {

          // Store user ID on socket
          socket.userId = userId;

          // Everyone joins the same room
          socket.join("community");

          console.log(
            `User ${userId} joined community`
          );

          // Send previous messages
          const messages =
            await Message.find()
              .populate(
                "sender",
                "anonymousName"
              )
              .sort({
                createdAt: 1,
              })
              .limit(100);

          socket.emit(
            "chatHistory",
            messages
          );

        } catch (error) {

          console.error(
            "JOIN COMMUNITY ERROR:",
            error
          );

        }

      }
    );


    // ==============================
    // SEND MESSAGE
    // ==============================

    socket.on(
      "sendMessage",
      async ({ content }) => {

        try {

          if (!socket.userId) {
            return;
          }

          if (
            !content ||
            !content.trim()
          ) {
            return;
          }

          const trimmedContent =
            content.trim();

          if (
            trimmedContent.length > 1000
          ) {
            return;
          }


          // Save message in MongoDB

          const message =
            await Message.create({
              sender: socket.userId,
              content:
                trimmedContent,
            });


          // Get sender's anonymous name

          const populatedMessage =
            await Message.findById(
              message._id
            ).populate(
              "sender",
              "anonymousName"
            );


          // Send message to everyone
          // in the community

          io.to("community").emit(
            "newMessage",
            populatedMessage
          );

        } catch (error) {

          console.error(
            "SEND MESSAGE ERROR:",
            error
          );

        }

      }
    );


    // ==============================
    // DISCONNECT
    // ==============================

    socket.on(
      "disconnect",
      () => {

        console.log(
          "User disconnected:",
          socket.id
        );

      }
    );

  });

};

export default setupChatSocket;