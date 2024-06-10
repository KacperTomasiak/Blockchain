import * as express from "express";
import {
  createKeysController,
  recoverKeysController,
  transactionController,
  blockController,
  blockchainController,
  addressController,
} from "../controllers/controllers";

export const router = express.Router();

router.get("/explorer/keys/create", createKeysController);

router.get("/explorer/keys/recover/:key", recoverKeysController);

router.get("/explorer/tx/:transaction", transactionController);

router.get("/explorer/block/:block", blockController);

router.get("/explorer/blockchain", blockchainController);

router.get("/explorer/address/:address", addressController);
