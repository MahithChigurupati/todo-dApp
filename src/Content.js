import "./Content.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import ABI from "./contract.json";
import Card from "./Card.js";

function Content() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [chainName, setChainName] = useState(null);

  const [input, setInput] = useState(null);
  const [task, setTask] = useState([]);

  const change = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x41a723c2F9607eD6F0C765E1B7898F3e96d89835",
      ABI,
      signer
    );

    const createTask = await contract.createTodo(input);
    const receipt = await createTask.wait();
    console.log(receipt);
  };

  const getdata = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x41a723c2F9607eD6F0C765E1B7898F3e96d89835",
      ABI,
      signer
    );

    const total = await contract.totalItems();

    setTask([]);
    for (var i = 0; i < total; i++) {
      const currentTask = await contract.todoList(i);
      setTask((prevTask) => [...prevTask, currentTask]);
    }
  };

  const getWalletAddress = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts");
      const currentAddress = await provider.getSigner().getAddress();

      setCurrentAccount(currentAddress);

      const chain = await provider.getNetwork();
      setChainName(chain.name);
    }
  };

  const chainChanged = () => {
    window.location.reload();
  };
  window.ethereum.on("chainChanged", chainChanged);
  window.ethereum.on("accountsChanged", getWalletAddress);

  useEffect(() => {
    getWalletAddress();
    getdata();
  }, []);

  return (
    <div className="Content">
      <p>{currentAccount}</p>
      <p> Chain name: {chainName} </p>
      <input value={input} onInput={(e) => setInput(e.target.value)}></input>
      <button onClick={change}>Add Task</button>

      {task.map((item) => (
        <Card name={item.itemName} id={item.itemID} done={item.status} />
      ))}
    </div>
  );
}

export default Content;
