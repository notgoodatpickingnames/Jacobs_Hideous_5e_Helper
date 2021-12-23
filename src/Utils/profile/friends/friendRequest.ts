import { IFriendRequest } from './IFriendRequest';

export class FriendRequest {
    public friendRequestId: string;
    public from: string;
    public to: string;

    constructor(friendRequest: IFriendRequest) {
        this.friendRequestId = friendRequest.friendRequestId;
        this.from = friendRequest.from;
        this.to = friendRequest.to;
    }
}