import { expect, describe, test } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("shorten URL tests", () => {
  test("sending no data to shorten route", async () => {
    const response = await request(app).post("/shorturl").send({
      originalUrl: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please enter URL");
  });

  test("sending wrong url to shorten route", async () => {
    const response = await request(app).post("/shorturl").send({
      originalUrl: "sdfsdfsdf",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please enter a Valid URL");
  });

  test("sending correct url to shorten route", async () => {
    const response = await request(app).post("/shorturl").send({
      originalUrl: "https://kartikkedia.in",
    });

    expect(response.status).toBe(200);
    expect(response.body.shortUrl).toBeDefined();
    expect(typeof response.body.shortUrl).toBe("string");
  });

  test("health route responds with working fine", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("working fine");
  });
});
