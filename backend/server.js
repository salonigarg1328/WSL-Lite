import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();

// ✅ Enable CORS globally
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ Handle OPTIONS preflight (for Express 5)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Install profile endpoint
app.post("/install-profile", (req, res) => {
  const { profileName, packages } = req.body;

  if (!profileName || !packages || packages.length === 0) {
    return res.status(400).send("Profile name or packages missing");
  }

  const packagesStr = packages.map((p) => `"${p}"`).join(" ");
  const command = `python "wsl_lite.py" --custom-profile "${profileName}" ${packagesStr}`;

  console.log("🚀 Running:", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Execution failed:", error.message);
      console.error("STDERR:", stderr);
      console.error("STDOUT:", stdout);
      return res
        .status(500)
        .json({ success: false, error: stderr || error.message, output: stdout });
    }

    console.log("✅ Success:", stdout);
    res.json({ success: true, message: stdout });
  });
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
