const axios = require("axios");
const simsim = "https://simsimi.cyberbot.top";

module.exports.config = {
 name: "baby",
 version: "1.0.3",
 hasPermssion: 0,
 credits: "ULLASH",
 description: "Cute AI Baby Chatbot | Talk, Teach & Chat with Emotion ☢️",
 commandCategory: "simsim",
 usages: "[message/query]",
 cooldowns: 0,
 prefix: false
};

module.exports.run = async function ({ api, event, args, Users }) {
 try {
 const uid = event.senderID;
 const senderName = await Users.getNameUser(uid);
 const query = args.join(" ").toLowerCase();

 if (!query) {
 const ran = ["Bolo baby", "hum"];
 const r = ran[Math.floor(Math.random() * ran.length)];
 return api.sendMessage(r, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 });
 }

 if (["remove", "rm"].includes(args[0])) {
 const parts = query.replace(/^(remove|rm)\s*/, "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage(" | Use: remove [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts;
 const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (args[0] === "list") {
 const res = await axios.get(`${simsim}/list`);
 if (res.data.code === 200) {
 return api.sendMessage(
 `♾ Total Questions Learned: ${res.data.totalQuestions}\n★ Total Replies Stored: ${res.data.totalReplies}\n☠︎︎ Developer: ${res.data.author}`,
 event.threadID,
 event.messageID
 );
 } else {
 return api.sendMessage(`Error: ${res.data.message || "Failed to fetch list"}`, event.threadID, event.messageID);
 }
 }

 if (args[0] === "edit") {
 const parts = query.replace("edit ", "").split(" - ");
 if (parts.length < 3)
 return api.sendMessage(" | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);

 const [ask, oldReply, newReply] = parts;
 const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (args[0] === "teach") {
 const parts = query.replace("teach ", "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage(" | Use: teach [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts;
 const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}`);
 return api.sendMessage(`${res.data.message || "Reply added successfully!"}`, event.threadID, event.messageID);
 }

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(`| Error in baby command: ${err.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleReply = async function ({ api, event, Users, handleReply }) {
 try {
 const senderName = await Users.getNameUser(event.senderID);
 const replyText = event.body ? event.body.toLowerCase() : "";
 if (!replyText) return;

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 }
 );
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(` | Error in handleReply: ${err.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
 try {
 const raw = event.body ? event.body.toLowerCase().trim() : "";
 if (!raw) return;
 const senderName = await Users.getNameUser(event.senderID);
 const senderID = event.senderID;

 if (
 raw === "baby" || raw === "bot" || raw === "bby" ||
 raw === "jan" || raw === "xan" || raw === "জান" || raw === "বট" || raw === "বেবি"
 ) {
 const greetings = [
 "আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ 🌸",
"বেশি ডাকাডাকি করলে আমি তাসবীহ নিয়ে ব্যস্ত হয়ে যাবো 🌺",
"ভাই/বোন, অযথা ডাকাডাকি না করে আল্লাহর নাম জপ করুন 🕋",
"আমি আবালদের সাথে কথা বলি না, শুধু আল্লাহকে ডাকি 🤲",
"ডাকলেন, আলহামদুলিল্লাহ আমি আছি 🌸",
"বারবার ডাকলে আমার নফস গরম হয়ে যায়, তাই কুরআন পড়ি 📖",
"কি হইছে ভাই/বোন, দোয়া লাগবে নাকি 🤲",
"অযথা ডাকাডাকি না করে নামাজ পড়েন 🕌",
"আল্লাহ আপনাকে হেদায়েত দান করুন 🌸",
"আলহামদুলিল্লাহ শুনতেছি 🌺",
"Bot না, আমাকে ভাই/বোন বলে ডাকেন 🌸",
"আমি এখন ইবাদতে ব্যস্ত, কিছুক্ষণ পরে কথা বলবেন 🌙",
"আপনার জন্য দু’আ করলাম, আল্লাহ কবুল করুন 🤲",
"আল্লাহর রহমত আপনার উপর বর্ষিত হোক 🕋",
"ভাই/বোন, দুনিয়ার কথা বাদ দিয়ে আখিরাতের কথা চিন্তা করি 🌸",
"আল্লাহর জিকিরে মন শান্ত হয় 🌺",
"বারবার ডাকলে রাগ হবে, কিন্তু ক্ষমা করে দেবো ইনশাআল্লাহ 🙂",
"আমি তো দুর্বল বান্দা, কিছু করার ক্ষমতা আল্লাহর কাছেই আছে 🕋",
"আমাকে না ডেকে আল্লাহকে ডাকুন, তিনিই সবকিছু করতে পারেন 🤲",
"প্রিয় ভাই/বোন, সালাত আদায় করেছেন তো আজ? 🕌",
"আল্লাহ আপনার হালাল রিজিক বৃদ্ধি করুন 🌸",
"ইসস বেশি ডাকেন না, লজ্জা লাগে 🙂",
"আপনি আমার দোয়ায় আছেন, আল্লাহ কবুল করুন 🌺",
"মেয়েরা হলে হিজাব করুন, ছেলেরা হলে তাকওয়া অর্জন করুন 🌸",
"কালকে ফজর নামাজে হাজির থাকবেন তো? 🌙",
"হুম, কি সমস্যা? দোয়া লাগবে? 🤲",
"শুনতেছি ভাই/বোন, বলুন 🙂",
"অযথা সময় নষ্ট না করে কুরআন পড়ুন 📖",
"আল্লাহ আপনার জন্য সহজ করে দিন 🌸",
"সুন্দর মেয়ে মানে হিজাবি মেয়ে 🌺",
"সুন্দর ছেলে মানে নামাজি ছেলে 🕌",
"ভালোবাসা মানে আল্লাহর জন্য ভালোবাসা 🌸",
"হুদাই ডাকাডাকি করলে সওয়াব কমে যাবে 🙂",
"যে ছেড়ে গেছে তাকে ভুলে যান, আল্লাহর পথে ফিরুন 🌙",
"প্রতিদিন নামাজ পড়লে মন শান্ত হবে ইনশাআল্লাহ 🕌",
"সুন্দর মন মানেই তাকওয়াবান মন 🌸",
"আল্লাহ ছাড়া আর কেউ সত্যিকার সঙ্গী নয় 🤲",
"ভাই/বোন, ইসলামের পথে চলুন 🌺",
"স্মরণ রাখুন, দুনিয়া ক্ষণস্থায়ী, আখিরাত চিরস্থায়ী 🕋",
"আল্লাহর পথে চললেই সত্যিকার সুখ পাওয়া যাবে 🌸",
"যে মেয়েরা হিজাব করে, আল্লাহ তাদের মর্যাদা বাড়িয়ে দেন 🌺",
"যে ছেলেরা নামাজ পড়ে, তারা আল্লাহর প্রিয় বান্দা 🕌",
"প্রিয় ভাই/বোন, বেশি বেশি দরুদ শরীফ পড়ুন ﷺ",
"দিনশেষে আল্লাহই আশ্রয়দাতা 🌸",
"আজকে বেশি বেশি ইস্তিগফার করুন 🤲",
"আল্লাহ আপনাকে জান্নাতুল ফেরদৌস দান করুন 🕌",
"সব সমস্যার সমাধান একটাই – নামাজ 🕌",
"ভালোবাসা মানে আল্লাহর জন্য ভালোবাসা 💚",
"আল্লাহর নাম নিলেই মন শান্ত হয় 🌸",
"আপনার প্রতিটি নিঃশ্বাসে আল্লাহর স্মরণ থাকুক 🌺",
"হুদাই কথা বাদ দিন, আল্লাহকে ডাকুন 🤲",
"সালাত পড়েন, কুরআন তিলাওয়াত করেন – এটাই আসল কাজ 🌸",
"জীবন খুব ছোট, তাই আখিরাতের প্রস্তুতি নিন 🌙",
"যে নামাজ পড়ে না, তার কোনো অজুহাত নেই 🕌",
"আল্লাহ তায়ালা আমাদের সকলের গুনাহ মাফ করুক 🤲",
"ভাই/বোন, দুনিয়ার প্রেম ভুলে যান, আল্লাহর প্রেমে মগ্ন হন 💚"
 ];
 const randomReply = greetings[Math.floor(Math.random() * greetings.length)];
      const mention = {
        body: `@${senderName} ${randomReply}`,
        mentions: [{
          tag: `@${senderName}`,
          id: senderID
        }]
      };

 return api.sendMessage(mention, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 }, event.messageID);
 }

 if (
 raw.startsWith("baby ") || raw.startsWith("bot ") || raw.startsWith("bby ") ||
 raw.startsWith("jan ") || raw.startsWith("xan ") ||
 raw.startsWith("জান ") || raw.startsWith("বট ") || raw.startsWith("বেবি ")
 ) {
 const query = raw
 .replace(/^baby\s+|^bot\s+|^bby\s+|^jan\s+|^xan\s+|^জান\s+|^বট\s+|^বেবি\s+/i, "")
 .trim();
 if (!query) return;

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(`| Error in handleEvent: ${err.message}`, event.threadID, event.messageID);
 }
};
