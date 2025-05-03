const duas = [
    {
      title: "আউজু বিল্লাহি মিনাশ শাইতানির রাজিম",
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      bangla: "বিতাড়িত শয়তানের হাত থেকে আল্লাহর নিকট আশ্রয় প্রার্থনা করছি।"
    },
    {
      title: "বিসমিল্লাহির রহমানির রাহিম",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      bangla: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে আরম্ভ করছি।"
    },
    {
      title: "রাব্বানা আ'তিনা ফিদ্দুনিয়া হাছানাতাঁও...",
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً...",
      bangla: "হে আমাদের পালনকর্তা, আমাদের দুনিয়াতে যা কল্যাণকর, পরকালে যা কল্যাণকর তা দান করুন..."
    },
    {
      title: "মাতা-পিতার জন্য সন্তানের দোয়া",
      arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      bangla: "হে আল্লাহ্, আমার মাতা-পিতার প্রতি আপনি সদয় হোন, তাঁরা শৈশবে আমাকে যেমন স্নেহ-মমতা দিয়ে লালন-পালন করেছেন।"
    },
    {
      title: "ঈমানের সাথে মৃত্যু বরণ করার দোয়া",
      arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا...",
      bangla: "হে আমাদের পালনকর্তা, সরলপথ প্রদর্শনের পর তুমি আমাদের অন্তরকে বক্র করে দিওনা..."
    },
    {
        title: "ঘুমানোর আগে",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        bangla: "তোমার নামে, হে আল্লাহ! আমি মৃত্যুবরণ করি ও জীবিত হই।"
      },
      {
        title: "ঘুম থেকে ওঠার পর",
        arabic: "الْـحَمْـدُ للهِ الَّذِي أَحْيَانَا",
        bangla: "সব প্রশংসা আল্লাহর, যিনি আমাদেরকে জীবিত করলেন।"
      },
      {
        title: "বাড়ি থেকে বের হওয়ার সময়",
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
        bangla: "আল্লাহর নামে, আমি তাঁর উপর ভরসা করি।"
      },
      {
        title: "রিজিক বৃদ্ধির দোয়া",
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
        bangla: "হে আল্লাহ! আপনি আমার হালাল রিজিক দ্বারা হারাম থেকে বাঁচিয়ে দিন।"
      },
      {
        title: "গুনাহ মাফের দোয়া",
        arabic: "رَبِّ اغْفِرْ لِي ذَنْبِي",
        bangla: "হে আমার রব! আমার গুনাহ মাফ করে দিন।"
      },
      {
        title: "পথভ্রষ্টতা থেকে বাঁচার দোয়া",
        arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
        bangla: "হে আল্লাহ! আমাকে সঠিক পথে পরিচালিত করুন এবং আমাকে সঠিক বানিয়ে দিন।"
      }
  ];
  const duaContainer=document.getElementById("duaContainer");
  const showRandomDua=()=>{
    const duya=Math.floor(Math.random()*duas.length);
    const selectedDuya=duas[duya];
    duaContainer.innerHTML=`
        <h4>${selectedDuya.title}</h4>
       <p class="arabic">${selectedDuya.arabic}</p>
      <p>${selectedDuya.bangla}</p>
    `;
  }
  const searchInput=document.getElementById("searchInput");
  const suggestions=document.getElementById("suggestions");
  const handleSearch=()=>{
     let search=searchInput.value.trim();
     const startFilter=duas.filter(duya=>duya.title.startsWith(search));
     const includeFilter=duas.filter(duya=>duya.title.includes(search));
    if(search&&startFilter.length!=0){
      suggestions.innerHTML="";
    startFilter.forEach(duya=>suggestions.innerHTML+=`
        <li  style="cursor: pointer" onclick="selectSuggestion('${duya.title}','${duya.arabic}','${duya.bangla}')">${duya.title}</li>
      `)
    }else if(search&&includeFilter.length!=0){
      suggestions.innerHTML="";
      includeFilter.forEach(duya=>suggestions.innerHTML+=`
        <li onclick="selectSuggestion('${duya.title}','${duya.arabic}','${duya.bangla}')" style="cursor: pointer">${duya.title}</li>
      `);
    }else{
      suggestions.innerHTML="";
    }
  }
  const selectSuggestion=(title,arabic,bangla)=>{
    searchInput.value="";
    suggestions.innerHTML="";
    // console.log(title,arabic);
    duaContainer.innerHTML=`
    <h4>${title}</h4>
   <p class="arabic">${arabic}</p>
  <p>${bangla}</p>
`;
  }