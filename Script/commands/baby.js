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
 "নিরবতা মানে অহংকার নয়,নিরবতা মানে ধৈর্য😊🥀", "🤍 যে আল্লাহর উপর ভরসা করে,সে কখনোই একা নয়।", "লক্ষে পৌঁছাতে ধৈর্য লাগে🐰🩷", "ধৈর্য কখনো-মানুষকে-ঠকাই না!!🌸🌿", "সম্পর্ক হোক হালাল!উদ্দেশ্য হোক জান্নাত,,🌺🥀", "বান্দার গুনাহ যত বড়💔আল্লাহর ক্ষমা তার চেয়েও বড়•🌺😘", "সৃষ্টিকর্তার উপর ভরসা থাকলে,অসম্ভব ও সম্ভব হয়ে যায়.❤️🥀", "হাসবুল্লাহ ওয়া নি'মাল ওয়াকিল অর্থাৎ আমার জন্য আমার আল্লাহ যথেষ্ট😍", "প্রসঙ্গ যখন ধর্মেরতখন আমাদের ইসলামি সেরা...😍", "🌸 “সবচেয়ে সুন্দর সম্পর্ক হলো,বান্দা ও রবের মধ্যে দোয়ার সম্পর্ক😍", "🔥 “হারিয়ে গেলে চিন্তা করো না,আল্লাহর রাস্তা সব সময় খোলা🙂", "নিশ্চয়ই আল্লাহ সবকিছুর উপর ক্ষমতাবান,সূরা বাকারা, আয়াত ২০", "লা ইলাহা ইল্লাল্লাহ এই একটি বাক্য বদলে দিতে পারে তোমার চিরকাল🕊️", "যে ব্যক্তি অন্যের জন্য দোয়া করে❤️😍🌼ফেরেশতারা  তার জন্য দোয়া করে🌺", "এত পৃথিবী যখন মুখ ফিরিয়ে নেয়, তখন আল্লাহ বলেন আমি তো আছি তোমার সাথে🥰", "ইসলাম শুধু ধর্ম নয়, এটা পুরো জীবন ব্যবস্থা🥰🤩", "সবকিছুর চাবিকাঠি আল্লাহর হাতে, তাঁর উপর ভরসা রাখো😇", "এত পৃথিবী যখন মুখ ফিরিয়ে নেয়, তখন আল্লাহ বলেন আমি তো আছি তোমার সাথে🥰", "জীবন হলো মৃত্যুর কাছ থেকে ধার করে নেওয়া কিছুটা সময়!🙂", "পাপকে মুছতে হবে, হয় দুনিয়াতে তাওবার অশ্রু দিয়ে, অথবা,আখিরাতের জাহান্নামের আগুন দিয়ে!(ইবনুল কাইয্যুম রাঃ)", "আল্লাহুম্মা ইন্নি আসআলুকা মিন ফাঁদলিক-অর্থঃ- হে আল্লাহ আপনি আমার ভাগ্য খুলে দিন🤲🥺", "নে’তার মতো নে’তা একজনই ছিলেন,তিনি হলেন-বিশ্বনবী হযরত মুহাম্মদ (সাঃ) আলহামদুলিল্লাহ🤩", "জীবন হলো মৃত্যুর কাছ থেকে ধার করে নেওয়া কিছুটা সময়!❣️💔", "সময় থাকতে ইসলামের পথে আসো🥰", " যে অন্তরে কুরআন আছে, সে অন্তর কখনো অন্ধ হয় না। 📖", "আল্লাহর সৃষ্টির তো সব কিছুই সুন্দর,অসুন্দর তো মানুষের মন ও মানসিকতা😅", "আল্লাহর উপর ভরসা করো, তিনিই যথেষ্ট,সূরা আল-ইমরান", "ভাগ্যকে গালি দিও না, তুমি ভাগ্যবান বলেই,প্রিয় নবী হযরত মুহাম্মদ (সঃ) এর উম্মত🤩🥰", "সবাই বলি,লা ইলাহা ইল্লাল্লাহু মুহাম্মাদুর রাসুলুল্লাহ🤍💝", "ইসলামের কোনো তথ্য জানতে চাইলে বস রানা ইনবক্সে নক দিন, https://www.facebook.com/profile.php?id=100042211012809", "আমার ইসলাম ধর্ম আমাকে শিখেছে, ঐ কপাল কখনো খারাপ হতে পারে না,যে কপাল আল্লাহর সিজদা করে🤩", "একদিন আমাদের ইসলাম ধর্ম পুরো পৃথিবী শাসন করবে,আর পুরো পৃথিবীতে ইসলামিক আদর্শে চলবে✊💯", "আর কিছু থাক বা না থাক এই পৃথিবীতে ইসলাম ছিলো, এবং ইসলাম থাকবে🤩🤗", "মক্কা! তুমি ধন্য! তোমার বুকে হয়েছিল বিশ্ব নবীর জন্ম, 𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡"
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
