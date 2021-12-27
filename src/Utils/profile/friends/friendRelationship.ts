import { IFriendRelationship } from './IFriendRelationship';

export class FriendRelationship {
    public friendRelationshipId: string;
    public from: string;
    public fromName: string;
    public to: string;
    public toName: string;
    public accepted: boolean;

    constructor(friendRequest: IFriendRelationship, fromName: string, toName: string) {
        this.friendRelationshipId = friendRequest.friendRelationshipId;
        this.from = friendRequest.from;
        this.fromName = fromName;
        this.to = friendRequest.to;
        this.toName = toName;
        this.accepted = friendRequest.accepted;
    }

    public getOtherUserName(userId: string): string {
        if (this.to === userId) {
            return this.fromName;
        }

        if (this.from === userId) {
            return this.toName;
        }
    }
}