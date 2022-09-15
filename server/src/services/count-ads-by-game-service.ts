import { prisma } from '../prisma';

export class CountAdsByGameService {
  async execute(id: string): Promise<number> {
    const game = await prisma.game.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    if (game === null) {
      return 0;
    }
    return game._count.ads;
  }
}
