enum FriendStatus
{
  Pending,
  Accepted,
  Declined,
  Blocked,
  // NOTE: the value below is only used to keep the code clean. It's not stored in the database; removed values == removed rows
  Removed
}

export default FriendStatus;
