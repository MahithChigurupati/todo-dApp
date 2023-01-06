import "./Card.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "./contract.json";

function Card(props) {
  const [checked, setChecked] = useState(props.done);

  const toggle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x41a723c2F9607eD6F0C765E1B7898F3e96d89835",
      ABI,
      signer
    );

    const toggleContract = await contract.setStatus(props.id);

    const receipt = await toggleContract.wait();
    if (receipt.confirmations > 0) {
      setChecked(!checked);
    }
  };

  return (
    <div className="item">
      <p>{props.name}</p>
      <input onClick={toggle} type="checkbox" checked={checked} />
    </div>
  );
}

export default Card;
