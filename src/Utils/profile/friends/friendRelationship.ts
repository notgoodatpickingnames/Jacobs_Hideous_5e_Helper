import { IFriendRelationship } from './IFriendRelationship';

export class FriendRelationship {
    public friendRelationshipId: string;
    public from: string;
    public to: string;

    constructor(friendRequest: IFriendRelationship) {
        this.friendRelationshipId = friendRequest.friendRelationshipId;
        this.from = friendRequest.from;
        this.to = friendRequest.to;
    }
}