const mongoose = require("mongoose");
const dns = require("dns");

// Some networks reject the SRV/TXT DNS queries required by mongodb+srv URIs.
// Allow a resolver to be supplied without baking network settings into code.
if (process.env.MONGODB_DNS_SERVERS) {
  dns.setServers(
    process.env.MONGODB_DNS_SERVERS.split(",").map((server) => server.trim())
  );
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
