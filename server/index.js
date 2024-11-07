import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';;

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-TOKEN",
})

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App Server");
});
app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),

        }
      ],
      back_urls: {
        success: "https://www.youtube.com/@fretido",
        failure: "https://www.youtube.com/@fretido",
        pending: "https://www.youtube.com/@fretido",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    res.status(500).json({
      error: `There was an error when creating a preference ${JSON.stringify(error)}`,
    })
  }
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})


