const input = document.getElementById("input");
const output = document.getElementById("output");
const prompt = "user@portfolio:~>"
const fileSystem = {
  home: {},
  projects: {},
  about: {},
  contact: {},
  
  "email.txt": `
directimpala@proton.me
  `,

  "number.txt": `
(352) 275-2680
  `,
}

let commandHistory = [];
let historyIndex = -1;

function print(text) {
  output.innerHTML += `<p>${text}</p>`;
  output.scrollTop = output.scrollHeight;
}

input.addEventListener("keydown", function(e) {

  // ENTER = run command
  if (e.key === "Enter") {
    const command = input.value.trim();

    print(`> ${command}`);
    commandHistory.push(command);
    historyIndex = commandHistory.length;

    handleCommand(command);

    input.value = "";
  }

  // UP ARROW = previous command
  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex];
    }
  }

  // DOWN ARROW = next command
  if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex];
    } else {
      input.value = "";
    }
  }

});

function handleCommand(command) {

  if (command === "help") {
    print("Available commands:");
    print("help, ls, pwd, cat 'filename', cd 'directory', clear, whoami");
  }

  else if (command === "whoami") {
    print("Andrew Lewis, an aspiring Linux Admin");
  }

  else if (command === "ls") {
    const fileList = Object.keys(fileSystem).join("  ");
    print(fileList);
    
  }

  else if (command === "pwd") {
    print("contact")
  }

  else if (command.startsWith("cat ")) {
    const fileName = command.split(" ")[1];

    if (fileSystem[fileName]) {
      print(fileSystem[fileName]);
    } else {
      print(`cat: ${fileName}: No such file`);
    }
  }

  else if (command.startsWith("cd ")) {
    const target = command.split(" ")[1];

    if (target === "home") {
      window.location.href = "../index.html";
    }
    else if (target === "projects") {
      window.location.href = "../projects/index.html";
    }
    else if (target === "about") {
      window.location.href = "../about/index.html";
    }
    else if (target === "contact") {
      window.location.href = "./index.html";
    }
    else {
      print(`cd: no such directory: ${target}`);
    }
  }

  else if (command === "clear") {
    output.innerHTML = "";
    print("Welcome to my portfolio");
    print("Type 'help' to see available commands");
  }

  else {
    print(`command not found: ${command}`);
  }
}
