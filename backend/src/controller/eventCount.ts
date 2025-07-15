import e, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
import { writeFile } from "fs";

const filePathEvent = path.join("src", "database", "event.json");
export async function getEventCounter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const fileData = await fs.readFile(filePathEvent, "utf-8");
    const fileJsonData = JSON.parse(fileData);
    return res.status(200).json({
      statusCode: 200,
      data: fileJsonData,
    });
  } catch (e) {
    next(e);
  }
}

export async function updateEventCount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { action } = req.query;
    const fileData = await fs.readFile(filePathEvent, "utf-8");
    const fileJsonData = JSON.parse(fileData);
    if (!action) {
      throw new Error("Action is Required.");
    } else if (action === "yes") {
      fileJsonData["yes"] = fileJsonData["yes"] + 1;
    } else if (action === "no") {
      fileJsonData["no"] = fileJsonData["no"] + 1;
    } else if (action === "mayBe") {
      fileJsonData["mayBe"] = fileJsonData["mayBe"] + 1;
    } else {
      throw new Error("Action must be one of the following yes,no,mayBe.");
    }

    await fs.writeFile(filePathEvent, JSON.stringify(fileJsonData));
    return res.status(201).json({
      statusCode: 201,
      data: fileJsonData,
    });
  } catch (e) {
    next(e);
  }
}
