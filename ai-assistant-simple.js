// Smart Salon AI Assistant - No API Required

function toggleChat(){
    var box = document.getElementById("chatBox");
    box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function quickAsk(text){
    document.getElementById("userInput").value = text;
    sendMessage();
}

function sendMessage(){

    var input = document.getElementById("userInput");
    var message = input.value.toLowerCase();

    if(message === "") return;

    var messages = document.getElementById("chatMessages");

    messages.innerHTML += "<div class='message user'>"+input.value+"</div>";

    // typing animation
    messages.innerHTML += "<div class='message bot typing' id='typing'>Typing...</div>";
    messages.scrollTop = messages.scrollHeight;

    setTimeout(function(){

        document.getElementById("typing").remove();

        var response = "";

        if(message.includes("hair")){
            response="💇‍♀️ Hair Services:<br>Haircut ₱150+<br>Hair Coloring ₱1,200+<br>Hair Styling ₱250+<br>Deep Conditioning ₱500+<br><br>Our Senior Hair Stylist Christopher Jake can help you!";
        }

        else if(message.includes("nail")){
            response="💅 Nail Services:<br>Manicure ₱150<br>Pedicure ₱200<br>Deluxe Manicure ₱500<br>Gel Polish ₱400+<br><br>Nail technician: Jenelyn Virtudes.";
        }

        else if(message.includes("makeup") || message.includes("bridal")){
            response="💄 Makeup Services:<br>Full Glam ₱1,500<br>Bridal Special ₱4,000<br><br>Makeup Artist: Marjorie Catubig.";
        }

        else if(message.includes("spa") || message.includes("facial")){
            response="💆 Spa & Facial:<br>Classic Facial ₱600<br>Day Spa Retreat ₱1,200<br><br>Spa Specialist: Renehart Carino.";
        }

        else if(message.includes("price")){
            response="💰 Our services range from ₱150 up to ₱4,000 depending on the service. Check our pricing section for full details!";
        }

        else if(message.includes("book") || message.includes("appointment")){
            response="📅 You can book through our contact form or call us at 0965 786 8608. We're open 9AM–7PM Monday to Saturday.";
        }

        else if(message.includes("location")){
            response="📍 We are located at Piapi Street, Dumaguete City. Visit RCMJ Beauty Salon anytime!";
        }

        else if(message.includes("staff") || message.includes("team")){
            response="👩‍🔧 Our Team:<br>Christopher Jake – Hair Stylist<br>Jenelyn Virtudes – Nail Technician<br>Marjorie Catubig – Makeup Artist<br>Renehart Carino – Spa Specialist";
        }

        else{
            response="Ask me about: hair, nails, makeup, spa, prices, booking, location, or staff 💕";
        }

        messages.innerHTML += "<div class='message bot'>"+response+"</div>";

        messages.scrollTop = messages.scrollHeight;

    },800);

    input.value="";
}


// Create Chat UI
function createChatInterface(){

const chatHTML = `
<button class="chat-btn" onclick="toggleChat()">💬</button>

<div class="chat-box" id="chatBox">

<div class="chat-header">💇‍♀️ Salon Assistant</div>

<div class="chat-messages" id="chatMessages">

<div class="message bot">
Welcome to <b>RCMJ Beauty Salon</b> 💄<br>
How can I help you today?
</div>

<div class="quick-buttons">
<button onclick="quickAsk('hair services')">Hair</button>
<button onclick="quickAsk('nail services')">Nails</button>
<button onclick="quickAsk('makeup services')">Makeup</button>
<button onclick="quickAsk('spa services')">Spa</button>
<button onclick="quickAsk('prices')">Prices</button>
</div>

</div>

<div class="chat-input">
<input type="text" id="userInput" placeholder="Ask about services..."
onkeypress="if(event.key==='Enter') sendMessage()">
<button onclick="sendMessage()">Send</button>
</div>

</div>
`;

document.body.insertAdjacentHTML("beforeend",chatHTML);


const styles = `

.chat-btn{
position:fixed;
bottom:90px;
right:20px;
background:#d4af37;
color:white;
border:none;
padding:15px;
border-radius:50%;
font-size:20px;
cursor:pointer;
z-index:10000;
box-shadow:0 4px 15px rgba(0,0,0,0.3);
}

.chat-box{
position:fixed;
bottom:150px;
right:20px;
width:320px;
background:white;
border-radius:15px;
box-shadow:0 10px 30px rgba(0,0,0,0.3);
display:none;
flex-direction:column;
overflow:hidden;
font-family:Arial;
z-index:10000;
}

.chat-header{
background:#d4af37;
color:white;
padding:15px;
text-align:center;
font-weight:bold;
}

.chat-messages{
padding:15px;
height:300px;
overflow-y:auto;
font-size:14px;
}

.message{
margin-bottom:10px;
line-height:1.4;
}

.bot{
color:#333;
}

.user{
text-align:right;
color:#d4af37;
font-weight:600;
}

.typing{
font-style:italic;
opacity:0.6;
}

.quick-buttons{
margin-top:10px;
}

.quick-buttons button{
margin:3px;
padding:6px 10px;
border:none;
background:#eee;
border-radius:6px;
cursor:pointer;
font-size:12px;
}

.quick-buttons button:hover{
background:#d4af37;
color:white;
}

.chat-input{
display:flex;
border-top:1px solid #ddd;
}

.chat-input input{
flex:1;
padding:10px;
border:none;
outline:none;
}

.chat-input button{
background:#d4af37;
color:white;
border:none;
padding:10px 15px;
cursor:pointer;
}

@media(max-width:768px){
.chat-box{
width:90%;
right:5%;
left:5%;
}
}

`;

const styleSheet=document.createElement("style");
styleSheet.textContent=styles;
document.head.appendChild(styleSheet);

}

document.addEventListener("DOMContentLoaded",createChatInterface);