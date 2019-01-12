export class AccountsService {
  accounts = [
    {
      name: 'Mister',
      status: 'active'
    },
    {
      name: 'Sir',
      status: 'inactive'
    },
    {
      name: 'Lady',
      status: 'unknown'
    }
  ];

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
  }
}
