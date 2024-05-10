



  
  const chatInput=document.querySelector("#chat-input");
  const sendButton=document.querySelector("#send-btn");
  const chatContainer=document.querySelector(".chat-container");
  const lightmode=document.querySelector("#theme-btn");
  const deletebtn=document.querySelector("#delete-btn");
  const bod=document.querySelector("body");
  
  let userText=null;
 
  
  const createElement=(html,className)=>{
      const chatDiv=document.createElement("div");
      chatDiv.classList.add("chat",className);
      chatDiv.innerHTML=html;
      return chatDiv;
  }



  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.5-pro-latest";
  const API_KEY = "AIzaSyAI_TYPt_m1aeO8F3wbDyJbg7SjVO-KfEA";
  
  async function getChatResponse(incomingChatDiv) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chat.sendMessage(userText);
    const response = result.response;
    
    console.log(response.text());
    const ans=response.text();
    

const pElement=document.createElement("p");
    
pElement.textContent=response.text();
incomingChatDiv.querySelector(".typing-animation").remove();
incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
chatInput.value="";
    

  }
  
  







  const copyResponse=(copyBtn)=> {
    const responseTextElement=copyBtn.parentElement.querySelector("p"); 
    navigator.clipboard.writeText(responseTextElement.textContent);
    copyBtn.textContent="done";
    setTimeout(()=> copyBtn.textContent="Copy" ,1000);
  
  }
  
  const showTypingAnimation=async()=>{
      const html=` <div class="chat-content">
      <div class="chat-details">
          <img src="images/chatbot.jpg" alt="chatbot-img">
          <div class="typing-animation">
              <div class="typing-dot" style="--delay: 0.1s"></div>
              <div class="typing-dot" style="--delay: 0.2s"></div>
              <div class="typing-dot" style="--delay: 0.3s"></div>
          </div>
      </div>
      <span onclick="copyResponse(this)" class="material-symbols-rounded" style ="font-size: 15px;">Copy</span>
  </div>`;
    const incomingChatDiv=createElement(html,"incoming");
    chatContainer.appendChild(incomingChatDiv);
    getChatResponse(incomingChatDiv);
  }
  
  
  const handleOutgoingChat=()=>{
  userText=chatInput.value.trim();
  if(!userText){
      return;
  }
   const html=`<div class="chat-content">
   <div class="chat-details">
       <img src="images/user.jpg" alt="user-img">
       <p></p>
   </div>
  </div>`;
    const outgoingChatDiv=createElement(html,"outgoing");
    outgoingChatDiv.querySelector("p").textContent=userText;
    chatContainer.appendChild(outgoingChatDiv);
    setTimeout(showTypingAnimation,500);
  }
  sendButton.addEventListener("click" , handleOutgoingChat);
  
  
  
  
  lightmode.addEventListener("click",function(){
      bod.classList.toggle("light-mode");
  });
  
  
  deletebtn.addEventListener("click",function(){
      location.reload();
  })