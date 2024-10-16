let dsMembers = [
  "rose",
  "lily",
  "iris",
  "daisy",
  "lotus",
  "tulip",
  "violet",
];

let dsInfo = {
  "rose": {
    "title": "the meloncholy leader",
    "role": "leading the group with quiet grace, holding the weight of their collective sadness. ",
  },
  "lily": {
    "title": "the silent protector",
    "role": "guards others with a protective, watchful presence.",
  },
  "iris": {
    "title": "the seeker of lost dreams",
    "role": "longs for forgotten dreams,she collects memories and fragments of broken hopes.",
  },
  "daisy": {
    "title": "the forgotten whisper",
    "role": "represents the beauty in being overlooked.often fading into the background, but her sadness stems from wanting to be seen yet knowing she never will be.",
  },
  "lotus": {
    "title": "the keeper of secrets",
    "role": "carries the burden of untold stories and secrets. her sorrow comes from the weight of knowing things she cannot speak.",
  },
  "tulip": {
    "title": "the gentle comforter",
    "role": "offering soft words and gentle touches, though her own sadness comes from never being able to lift the sadness of others.",
  },
  "violet": {
    "title": "the enigmatic observer",
    "role": "the one who silently watches over, absorbing their stories and emotions. she holds a deep understanding of the sadness and often reflects it in her own unique way.",
  },
};

function Button(id = "", className = "") {
  let button = document.createElement("button");
  button.id = id;
  button.className = className;
  return button;
}

function Div(id = "", className = "") {
  let div = document.createElement("div");
  div.id = id;
  div.className = className;
  return div;
}

function Text(text = "", className = "", id = "") {
  let p = document.createElement("p");
  p.textContent = text;
  p.className = className;
  p.id = id;
  return p;
}

function Info(memberName, infoList = dsInfo) {
  let memberInfo = infoList[memberName];
  let div = Div(memberName + "Info", "memberInfo");
  div.tabIndex = 0;
  
  for (let info in memberInfo) {
    let propertyText = info.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    let valueText = memberInfo[info];
    let propertyClass = "member" + info.replace(/([A-Z]+)/g, "$1").replace(/([A-Z][a-z])/g, "$1").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    let p = Text(propertyText + ": " + valueText, propertyClass, memberName + info);
    div.appendChild(p);
  }
  
  return div;
}

function showMember(member) {
  member.style.height = "50vh";
  document.getElementById(member.id + "Label").style.display = "inline";
  document.getElementById(member.id + "Info").style.display = "inline";
  member.collapsed = false;
}

function collapseProfile(member, initHeight = (100 / dsMembers.length) + "vh") {
  member.style.height = initHeight;
  member.style.filter = "grayscale(100%) brightness(50%)";
  document.getElementById(member.id + "Label").style.display = "none";
  document.getElementById(member.id + "Info").style.display = "none";
  member.collapsed = true;
}

function collapseAllProfiles(profileClassName = "Profile") {
  let profiles = document.getElementsByClassName(profileClassName);
  for (let i = 0; i < profiles.length; i++) {
    collapseProfile(profiles[i]);
  }
}

function collapseAllProfilesExcept(member, members) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id !== member.id) {
      collapseProfile(members[i]);
    }
  }
}

function toggle(member, members) {
  collapseAllProfilesExcept(member, members);
  if (member.collapsed) {
    showMember(member);
  } else {
    collapseProfile(member);
  }
}

function Profile(memberName = "iris") {
  let button = Button(memberName, "Profile");
  button.textContent = memberName + " Profile";
  button.collapsed = true;

  // Profile text
  let label = Text(memberName, "memberLabel", memberName + "Label");
  let info = Info(memberName);
  button.appendChild(label);
  button.appendChild(info);

  let bgImage = (fileExtension) => "url('./img/" + fileExtension + "/" + memberName + "." + fileExtension + "')";
  button.style.backgroundImage = bgImage("webp") + ", " + bgImage("png"); // + ", " + bgImage("jpg");

  let openProfile = () => {
    toggle(button, document.body.getElementsByClassName("Profile"));
    setTimeout(() => {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  }

  button.addEventListener("click", openProfile);

  return button;
}

function Profiles(memberList = dsMembers) {
  let div = Div("DS", "wrapper");
  for (let i = 0; i < memberList.length; i++) {
    let member = Profile(memberList[i]);
    member.style.animation = "intro " + Math.log(i + 2) + "s";
    div.appendChild(member);
  }
  return div;
}