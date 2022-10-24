import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import CommunityCollection from './collection';
import { communityRouter } from './router';

const isCommunityNameNotTaken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name) {
        next();
        return;
    }

    const community = await CommunityCollection.findOneByName(req.body.name);

    if (!community) {
        next();
        return;
    }

    res.status(409).json({
        error: {
          name: 'A community with this name already exists.'
        }
    });
    return;
};

const isCommunityExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.communityId);
    const community = validFormat ? await CommunityCollection.findOneByCommunityId(req.params.communityId): '';
    if (!community) {
        res.status(404).json({
            error: {
                communityNotFound: `Freet with freet ID ${req.params.communityId} does not exist.`
            }
        });
        return;
    }

    next();
};

const isCurrentUserCommunityOwner = async(req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
        const user = await UserCollection.findOneByUserId(req.session.userId);
        const community = await CommunityCollection.findOneByCommunityId(req.params.communityId);
        if (user._id.toString() !== community.ownerId.toString()) {
            res.status(403).json({
                error: 'You are not the owner of this community.'
            });
            return;
        }
    }
    next();
}

export {
    isCommunityNameNotTaken,
    isCommunityExists,
    isCurrentUserCommunityOwner 
};