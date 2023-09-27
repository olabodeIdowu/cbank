function UserAvatar() {
  // const { currentUser } = useAuthContext();
  return (
    <main className='styledUserAvatar'>
      <img
        // src={avatar || 'default-user.jpg'}
        src='/default-user.jpg'
        alt=''
      />
      {/* <span>{currentUser?.full_name}</span> */}
    </main>
  );
}

export default UserAvatar;
