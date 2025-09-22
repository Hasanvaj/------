module.exports.config = {
  name: "bukhari",
  version: "1.2.8",
  hasPermssion: 0,
  credits: "nazrul", //Don't chinge The credit
  description: "all islamick information",
  commandCategory: "Utilities",
  usages: "doya",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  } 
}

module.exports.onLoad = () => {
  let { mkdirSync, existsSync, createWriteStream } = require("fs-extra");
  let request = require("request");
  let dirMaterial = __dirname + `/noprefix/amol/`; 
  if (!existsSync(dirMaterial + "noprefix" + "amol")) mkdirSync(dirMaterial, { recursive: true });

  if (!existsSync(dirMaterial + "mm.jpg")) request("https://i.imgur.com/hR0it3b.jpg").pipe(createWriteStream(dirMaterial + "mm.jpg"))

  if (!existsSync(dirMaterial + "tt.jpg")) request("https://i.imgur.com/an55AjS.jpg").pipe(createWriteStream(dirMaterial + "tt.jpg"))

  if (!existsSync(dirMaterial + "gg.jpg")) request("https://i.imgur.com/6cYefRT.jpg").pipe(createWriteStream(dirMaterial + "gg.jpg"))

  if (!existsSync(dirMaterial + "pp.jpg")) request("https://i.imgur.com/Eo3iuiD.jpg").pipe(createWriteStream(dirMaterial + "pp.jpg"))

  if (!existsSync(dirMaterial + "aa.jpg")) request("https://i.imgur.com/2EuxYZu.jpg").pipe(createWriteStream(dirMaterial + "aa.jpg"))

  if (!existsSync(dirMaterial + "kk.jpg")) request("https://i.imgur.com/Cz4A7W4.jpg").pipe(createWriteStream(dirMaterial + "kk.jpg"))

  if (!existsSync(dirMaterial + "yy.jpg")) request("https://i.imgur.com/H3gV5rE.jpg").pipe(createWriteStream(dirMaterial + "yy.jpg"))

  if (!existsSync(dirMaterial + "ss.jpg")) request("https://i.imgur.com/qR4J8PC.jpg").pipe(createWriteStream(dirMaterial + "ss.jpg"))

  if (!existsSync(dirMaterial + "hh.jpg")) request("https://i.imgur.com/nJxtFXI.jpg").pipe(createWriteStream(dirMaterial + "hh.jpg"))

  if (!existsSync(dirMaterial + "nn.jpg")) request("https://i.imgur.com/P1AFWty.jpg").pipe(createWriteStream(dirMaterial + "nn.jpg"))

  if (!existsSync(dirMaterial + "vv.jpg")) request("https://i.imgur.com/6Io2uyW.jpg").pipe(createWriteStream(dirMaterial + "vv.jpg"))

  if (!existsSync(dirMaterial + "cc.jpg")) request("https://i.imgur.com/hJ5nfUa.jpg").pipe(createWriteStream(dirMaterial + "cc.jpg"))

}

module.exports.handleReply = async ({ api, event, handleReply }) => {
  let { createReadStream } = require("fs-extra");
  let { threadID, messageID, senderID, body } = event;
    switch(handleReply.type) {
        case "choosee": {
            switch(body) {

          case "1":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "رَبِّ ٱرۡحَمۡهُمَا كَمَا رَبَّيَانِي صَغِيرٗا উচ্চারণ: ‘রাব্বির হামহুমা, কামা রাব্বায়ানি সাগিরা।’ অর্থ: ‘হে আমার প্রতিপালক, তাদের উভয়ের প্রতি রহম করো; যেমন তারা আমাকে শৈশবকালে লালন-পালন করেছেন।’ (সুরা বনি ইসরাইল: ২৪)", 
        attachment: createReadStream(__dirname + `/noprefix/amol/mm.jpg`)
      }, threadID, messageID);
      break;

    case "2":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "ঘুমানোর দোয়া হলো "«اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا»" (আল্লাহুম্মা বিসমিকা আমুতু ওয়া আহইয়া), যার অর্থ,হে আল্লাহ! তোমার নামে আমি মৃত্যুবরণ করি এবং তোমার নামেই জীবিত হই এটি ঘুমানোর আগে পড়ার একটি সহজ ও গুরুত্বপূর্ণ দোয়া যা রাসূল (সা.) শিখিয়েছেন", 
        attachment: createReadStream(__dirname + `/noprefix/amol/tt.jpg`)
      },threadID, messageID);
      break;

    case "3":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "3. رَبَّنَا ٱغۡفِرۡ لِي وَلِوَٰلِدَيَّ وَلِلۡمُؤۡمِنِينَ يَوۡمَ يَقُومُ ٱلۡحِسَابُ উচ্চারণ: ‘রাব্বানাগ ফিরলি ওয়ালি ওয়ালিদাইয়া, ওয়ালিল মু’মিনিনা ইয়াওমা ইয়াক্বুমুল হিসাব।’ অর্থ: ‘হে আমাদের প্রতিপালক! রোজ কেয়ামতে আমাকে, আমার পিতা-মাতা ও সকল মুমিনকে ক্ষমা করুন।’ (সুরা ইবরাহিম: ৪১)", 
        attachment: createReadStream(__dirname + `/noprefix/amol/gg.jpg`)
      }, threadID, messageID); 
      break;

    case "4":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "4. سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ ‘সুবহানাল্লাযী সাখখারা লানা হা-যা ওয়ামা- কুন্না- লাহু মুক্বরিনীন ওয়া ইন্না ইলা রব্বিনা লামুনক্বালিবূন’ অর্থ: হে আল্লাহ! মহান সত্তার পবিত্রতা জ্ঞাপন করছি, যিনি আমাদের জন্য একে বশীভূত করেছেন। আমরা একে বশীভূত করতে সক্ষম নই। বস্তুত আমরা তাঁর দিকে প্রত্যাবর্তন করছি।’ (শামায়েলে তিরমিজি: ১৭৩)", 
        attachment: createReadStream(__dirname + `/noprefix/amol/pp.jpg`)
      }, threadID, messageID); 
      break;

    case "5":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "5. أسْتَغْفِرُ اللَّهَ الَّذي لا إلهَ إِلاَّ هُوَ الحَيَّ القَيُّومَ وأتُوبُ إلَيْهِ উচ্চারণ: ‘আস্তাগফিরুল্লা-হাল্লাজি লা- ইলা-হা ইল্লা- হুওয়া হাইয়্যুল কইয়্যূম ওয়া আতূবু ইলাইহি।’ অনুবাদ: ‘আমি আল্লাহর কাছে ক্ষমা চাই, তিনি ছাড়া প্রকৃতপক্ষে কোন মাবুদ নেই, তিনি চিরঞ্জীব, চিরস্থায়ী এবং তাঁর কাছে তাওবা করি।’ (আবু দাউদ: ১৫১৭) অথবা শুধু أسْتَغْفِرُ اللَّهَ বলাও ক্ষমাপ্রার্থনার একটি দোয়া।", 
        attachment: createReadStream(__dirname + `/noprefix/amol/kk.jpg`)
      }, threadID, messageID); 
      break;

    case "6":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "6. প্রাপ্তবয়স্ক পুরুষ বা নারীর ক্ষেত্রে- اَللّٰهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِ نَا وَغَائِبِنَا وَصَغِيْرِنَا وَكَبِيْرِنَا وَذَكَرِنَا وَاُنْثَنَا اَللّٰهُمَّ مَنْ اَحْيَيْتَهُ مِنَّا فَاَحْيِهِ عَلٰى الْاِسْلاَمِ وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلٰى الْاِيْمَانِ উচ্চারণ: আল্লাহুম্মাগ ফিরলি হায়্যিনা ওয়া মাইয়্যিতিনা ওয়া শাহিদিনা ওয়া গায়িবিনা ওয়া সাগীরিনা ওয়া কাবীরিনা ওয়া যাকারিনা ওয়া উনছানা। আল্লাহুম্মা মান আহইয়াহতাহু মিন্না, ফাআহয়িহী আলাল ইসলামি ওয়া মান তাওয়াফ ফাইতাহু মিন্না ফাতাওয়াফফাহ আলাল ইমান। অর্থ: ‘হে আল্লাহ, আমাদের জীবিত ও মৃত, উপস্থিত ও অনুপস্থিত, ছোট ও বড় এবং পুরুষ ও নারী সকলকে ক্ষমা করে দিন। হে আল্লাহ, আপনি আমাদের মধ্য থেকে যাদেরকে জীবিত রেখেছেন ইসলামের উপর জীবিত রাখেন আর যাদেরকে মৃত্যু দান করেছেন তাদেরকে ঈমানের সঙ্গেই মৃত্যু দান করেন।’

অপ্রাপ্তবয়স্ক ছেলের জানাজায় পড়বেন- اَللّٰهُمَّ اجْعَلْهُ لَنَا فَرَطًا وَّاجْعَلْهُ لَنَا اَجْرً ا وَّاجْعَلْهُ لَنَا شَافِعًا وَّمُشَفِّعًا উচ্চারণ: ‘আল্লাহুম্মাজ আলহু লানা ফারাতাও ওয়াজ আলহু লানা আজরাও ওয়াজ আলহু লানা শাফিআও ওয়া মুশাফফাআ।’ অর্থ: ‘হে আল্লাহ, আপনি তাকে আমাদের জন্য অগ্রবর্তী হিসেবে কবুল করুন, তাকে করুন আমাদের জন্য প্রতিদান স্বরূপ এবং তাকে বানান আমাদের জন্য সুপারিশকারী -যার সুপারিশ কবুল করা হবে।’ 

অপ্রাপ্তবয়স্ক মেয়ের জানাজায় পড়বেন- ًاَللّٰهُمَّ اجْعَلْهَا لَنَا فَرْطًا وَّاجْعَلْهَا لَنَا اَجْرًا وَّذُخْرًا وَّاجْعَلْهَا لَنَا شَافِعَةً وَّمُشَفَّعَة উচ্চারণ: ‘আল্লাহুম্মাজ আলহা লানা ফারতাঁও ওয়াজ আলহা লানা আজরাঁও ওয়া যুখরাঁও ওয়াজ আলহা লানা শা-ফিয়াতাওঁ ওয়া মুশাফফাআহ।’ অর্থ: ‘হে আল্লাহ, আপনি তাকে আমাদের জন্য অগ্রবর্তী হিসেবে কবুল করুন, তাকে করুন আমাদের জন্য প্রতিদান স্বরূপ এবং তাকে বানান আমাদের জন্য সুপারিশকারী -যার সুপারিশ কবুল করা হবে।’ (তিরমিজি: ৯৪৫; দারা কুতনি: ১৮৫৩; ইবনে আবি শায়বা: ৩/২৯৫", 
        attachment: createReadStream(__dirname + `/noprefix/amol/ss.jpg`)
      }, threadID, messageID); 
      break;

    case "7":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: " 7. أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّياطِينِ وَأَنْ يَحْضُرُونِ উচ্চারণ: আঊযু বিকালিমাতিল্লাহিত্তাম্মাতি মিন গাদ্বাবিহি ওয়া ইক্বাবিহি ওয়া শাররি ‘ইবাদিহি ওয়ামিন হামাযাতিশ্ শায়া-ত্বীনি ওয়া আন ইয়াহদুরুন। অর্থ: আল্লাহর পূর্ণ কালেমাসমূহের দ্বারা তাঁর গজব ও তাঁর বান্দাদের খারাবি ও শয়তানের কুমন্ত্রণা ও আমার নিকট তার উপস্থিত হওয়া থেকে আশ্রয় চাইছি। (আবু দাউদ : ৩৮৯৩, তিরমিজি : ৩৫২৮)", 
        attachment: createReadStream(__dirname + `/noprefix/amol/hh.jpg`)
      }, threadID, messageID); 
      break;

    case "8":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "8. بِسْمِ اللَّهِ اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا‏ ‘বিসমিল্লাহি আল্লাহুম্মা জান্নিবনাশ শাইতানা ওয়া জান্নিবিশ শাইতানা মা রাজাকতানা।’ অর্থ: আল্লাহর নামে শুরু করছি। হে আল্লাহ! আমাদের শয়তানের প্রভাব থেকে দূরে রাখুন এবং আমাদের যে সন্তান দান করবেন তাদের শয়তানের প্রভাব থেকে বাঁচিয়ে রাখুন। (বুখারি: ১৪১, ৩২৭১)", 
        attachment: createReadStream(__dirname + `/noprefix/amol/nn.jpg`)
      }, threadID, messageID); 
      break;

    case "9":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "9. اللَّهُمَّ رَبَّ جِبْرَائِيلَ وَمِيكَائِيلَ وَرَبَّ إِسْرَافِيلَ أَعُوذُ بِكَ مِنْ حَرِّ النَّارِ وَمِنْ عَذَابِ الْقَبْرِ উচ্চারণ: আল্লাহুম্মা রব্বা জিবরাইলা ওয়া মিকাইলা, ওয়া রব্বা ইসরাফিলা, আউজু বিকা মিন হাররিন নারি ওয়া মিন আজাবিল কাবরি। অর্থ: হে আল্লাহ, জিবরাইল ও মিকাইলের প্রতিপালক এবং ইসরাফিলের প্রতিপালক! আমি আপনার কাছে আশ্রয় প্রার্থনা করছি জাহান্নামের উত্তাপ ও কবরের আজাব থেকে। (সুনানে নাসায়ি: ৫৫১৯)", attachment: createReadStream(__dirname + `/noprefix/amol/cc.jpg`)
      }, threadID, messageID); 
      break;

    case "10":
                api.unsendMessage(handleReply.messageID);
      api.sendMessage({
        body: "10. اللهم اني اسالك الجنة واعوذ بك من النار উচ্চারণ: ‘আল্লাহুম্মা ইন্নি আসআলুকাল জান্নাহ, ওয়া আঊযুবিকা মিনান্নার।’ অর্থ: ‘হে আল্লাহ আমি আপনার কাছে জান্নাত কামনা করছি এবং জাহান্নাম থেকে আপনার কাছে আশ্রয় প্রার্থনা করছি।’ (সুনানে তিরমিজি: ২৫৭২)", 
        attachment: createReadStream(__dirname + `/noprefix/amol/tuất.jpg`)
      }, threadID, messageID); 
      break;

      case "11":
                api.unsendMessage(handleReply.messageID);
      api.sandmessage({
        body:"11. ﺍﻟﻠَّﻬُﻢَّ ﺭَﺏَّ ﻫَﺬِﻩِ ﺍﻟﺪَّﻋْﻮَﺓِ ﺍﻟﺘَّﺎﻣَّﺔِ، ﻭَﺍﻟﺼَّﻼَﺓِ ﺍﻟْﻘَﺎﺋِﻤَﺔِ، ﺁﺕِ ﻣُﺤَﻤَّﺪﺍً ﺍﻟْﻮَﺳِﻴﻠَﺔَ ﻭَﺍﻟْﻔَﻀِﻴﻠَﺔَ، ﻭَﺍﺑْﻌَﺜْﻪُ ﻣَﻘَﺎﻣَﺎً ﻣَﺤﻤُﻮﺩﺍً ﺍﻟَّﺬِﻱ ﻭَﻋَﺪْﺗَﻪُ উচ্চারণ: ‘আল্লা-হুম্মা রাব্বা হা-জিহিদ দা‘ওয়াতিত তা-ম্মাতি ওয়াস সালা-তিল ক্বা-য়িমাতি, আ-তি মুহাম্মাদান আল ওয়াসীলাতা ওয়াল ফাদীলাতা, ওয়াব‘আসহু মাকা-মাম মাহমূদানিল্লাযী ওয়াআদতাহ’ অর্থ: ‘হে আল্লাহ! এই পরিপূর্ণ আহ্বান এবং প্রতিষ্ঠিত সালাতের তুমিই প্রভু! মুহাম্মদ (স.)-কে অসিলা তথা জান্নাতের একটি স্তর এবং ফজিলত তথা সকল সৃষ্টির উপর অতিরিক্ত মর্যাদা দান করুন। আর তাঁকে মাকামে মাহমূদে (প্রশংসিত স্থানে) পৌঁছে দিন, যার প্রতিশ্রুতি আপনি তাঁকে দিয়েছেন।’ (বুখারি: ১/২৫২,নং ৬১৪; বুখারি:১/২২২, নং: ৫৮৯)", 
        attachment: createReadStream(__dirname + `/noprefix/amol/hợi.jpg`)
      }, threadID, messageID); 
            break;

          default:
        const choose = parseInt(body);
              if (isNaN(body)) return api.sendMessage("•—»✨ Pleaser enter 1 Number ", threadID, messageID);
              if (choose > 9 | choose < 1) return api.sendMessage("•—»✨ Selections  is not in the list", threadID, messageID); 

      }
    }
  }
}

module.exports.run = async ({ api, event, handleReply }) => {
  let fs = require("fs-extra");
  let { threadID, senderID } = event;
  return api.sendMessage({ body: "কিছু সুন্দর দোয়া আশা করি সকলে ভালো লাগবে-!!\n\n𝟏. মা-বাবার জন্য দোয়া \n𝟐AI ঘুমানো-দোয়া\n𝟑.সকল মুসলমানের -জন্য দোয়া\n𝟒.যানবাহনে-চড়ার দোয়া\n𝟓.ক্ষমাপ্রার্থনার-দোয়া\n𝟔.জানাজার-নামাজে দোয়া\n𝟕.ঘুমে ভয়-পেলে দোয়া\n𝟖.সহবাসের দোয়া\n𝟗.জান্নাত লাভের দোয়া\n𝟭𝟬.গুনাহ্ মাফের -দোয়া\n𝟭𝟭.আজান শুনে দোয়া\𝗻এখানে কিছু দোয়া দেওয়া আছে, আশা করি আপনাদের ভালো লাগবে, যেই কোনো একটি নাম্বার সংযোগ করে  রিপ্লাই মেসেজ দিন-!!"
            }, threadID, (error, info) => {
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
        })  
    })
  }
