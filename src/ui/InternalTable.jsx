export default function InternalTable() {
  return (
    <table className='content-table'>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Gender</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ cursor: 'pointer' }}>
          <td>Olabode Idowu</td>
          <td>o.idowu@cloudbank.ng</td>
          <td>+234 90 4567 8900</td>
          <td>admin</td>
          <td
            style={{
              color: '#2eb85c',
            }}
          >
            Active
          </td>
          <td>Male</td>
          <td>19-Aug-2023</td>
        </tr>
        <tr style={{ cursor: 'pointer' }}>
          <td>Elizabeth Modupe</td>
          <td>e.modupe@cloudbank.ng</td>
          <td>+234 90 2233 4455</td>
          <td>account manager</td>
          <td
            style={{
              color: '#b91c1c',
            }}
          >
            Deleted
          </td>
          <td>Female</td>
          <td>20-Aug-2023</td>
        </tr>
      </tbody>
    </table>
  );
}
