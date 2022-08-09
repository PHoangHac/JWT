import mongoose from "mongoose";

const ConnectURL = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log({ msg: `Connect successful !` });
  } catch (error) {
    console.log({ msg: error });
  }
};

export default ConnectURL;
