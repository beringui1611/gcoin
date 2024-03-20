import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();
import add from "../ignores/add";
async function main(){
    const Gcoin = await ethers.deployContract("Gcoin");
    await Gcoin.waitForDeployment();
    //ignore secret 
    await add.mn(`${process.env.SECRET}`)
    console.log(`Gcoin deployed to ${Gcoin.target}`);
}

main().catch((error) =>{
    console.error(error);
    process.exitCode = 1;
});