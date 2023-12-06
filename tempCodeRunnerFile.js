console.error("Unexpected error:", error.message);
          return res.status(500).json({ error: "Internal server error" });