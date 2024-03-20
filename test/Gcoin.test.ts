import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Genesis", function () {
  const BALANCE_OWNER = 6_802_250_000_000;

  async function deployFixture() {
    const [owner, otherAccount,] = await hre.ethers.getSigners();

    const Gcoin = await hre.ethers.getContractFactory("Gcoin");
    const gCoin = await Gcoin.deploy();

    return { gCoin, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should get owner", async function () {
      const { gCoin, owner} = await loadFixture(deployFixture);
      expect(await gCoin.getOwner()).to.equal(owner.address);
    });

    it("Should get price", async function () {
      const { gCoin } = await loadFixture(deployFixture);
      expect(await gCoin.getPrice()).to.equal(1000000n);
    })

    it("Should add official contract", async function () {
      const { gCoin, owner} = await loadFixture(deployFixture);
      const instance = gCoin.connect(owner);
      await instance.registerOficialContract(gCoin.target)
      expect(await gCoin.getOficialAddress()).to.equal(gCoin.target);
    })

    it("Should add not permission ", async function () {
      const { gCoin, owner, otherAccount} = await loadFixture(deployFixture);
      const instance = gCoin.connect(otherAccount);
      await expect(instance.registerOficialContract(gCoin.target)).to.be.revertedWith("do you not permission")
    })
    it("Should get official", async function () {
      const { gCoin, owner} = await loadFixture(deployFixture);
      const instance = gCoin.connect(owner);
      await instance.registerOficialContract(gCoin.target)
      expect(await gCoin.getOficialAddress()).to.equal(gCoin.target);
    })

    it("Should get balance owner", async function () {
      const { gCoin, owner} = await loadFixture(deployFixture);
      expect(await gCoin.balanceOf(owner.address)).to.equal(BALANCE_OWNER);
    })

    it("Should burn ", async function () {
      const { gCoin, owner} = await loadFixture(deployFixture);
      await gCoin.burn(BALANCE_OWNER);
      expect(await gCoin.balanceOf(owner.address)).to.equal(0n);
    })

    it("Should NOT permission burn ", async function () {
      const { gCoin, otherAccount} = await loadFixture(deployFixture);
      const instance = gCoin.connect(otherAccount);
      await expect(instance.burn(BALANCE_OWNER)).to.be.revertedWith("do you not permission")
    })
  });
});
