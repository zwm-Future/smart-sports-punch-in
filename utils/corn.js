export const handleIdentityId = function () {
  let identityId;
  const user = wx.getStorageSync('user')
  if (user.identityId == 1) identityId = 1;
  else identityId = 2;
  this.setData({
    identityId
  });
}