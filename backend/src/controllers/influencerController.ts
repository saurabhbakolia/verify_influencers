import { Request, Response } from "express";
import { discoverInfluencerService, getInfluencerService } from "../services/influencerServices";

export const discoverInfluencer = async (req: Request, res: Response) => {
    const { name, platform } = req.body;
    const data = await discoverInfluencerService(name, platform);
    res.json(data);
};

export const getInfluencers = async (req: Request, res: Response) => {
    const influencers = await getInfluencerService();
    res.json(influencers)
};