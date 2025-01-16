import { prisma } from '../prisma';

export const discoverInfluencerService = async (name: string, platform: string) => {
    // TODO: Add logic to extract health claims
    return prisma.influencer.create({
        data: { name, platform, followers: 0, trustScore: 0 },
    });
};

export const getInfluencerService = async () => {
    return prisma.influencer.findMany();
};