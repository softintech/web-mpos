import ServiceContractTableMock from "./ServiceContractTableMock";
import MockUtils from "./../mock.utils";

export default function mockServiceContract(mock) {
  mock.onPost("api/ServiceContracts").reply(({ data }) => {
    const { ServiceContract } = JSON.parse(data);
    const {
      firstName = "",
      lastName = "",
      email = "",
      userName = "",
      gender = "Female",
      status = 0,
      dateOfBbirth = "01/01/2019",
      ipAddress = "127.0.0.1",
      type = 1
    } = ServiceContract;

    const id = generateUserId();
    const newServiceContract = {
      id,
      firstName,
      lastName,
      email,
      userName,
      gender,
      status,
      dateOfBbirth,
      ipAddress,
      type
    };
    ServiceContractTableMock.push(newServiceContract);
    return [200, { ServiceContract: newServiceContract }];
  });

  mock.onPost("api/ServiceContracts/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdServiceContracts = mockUtils.baseFilter(
      ServiceContractTableMock,
      queryParams
    );
    return [200, filterdServiceContracts];
  });

  mock.onPost("api/ServiceContracts/deleteServiceContracts").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = ServiceContractTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        ServiceContractTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/ServiceContracts/updateStatusForServiceContracts").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    ServiceContractTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/ServiceContracts\/\d+/).reply(config => {
    const id = config.url.match(/api\/ServiceContracts\/(\d+)/)[1];
    const ServiceContract = ServiceContractTableMock.find(el => el.id === +id);
    if (!ServiceContract) {
      return [400];
    }

    return [200, ServiceContract];
  });

  mock.onPut(/api\/ServiceContracts\/\d+/).reply(config => {
    const id = config.url.match(/api\/ServiceContracts\/(\d+)/)[1];
    const { ServiceContract } = JSON.parse(config.data);
    const index = ServiceContractTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    ServiceContractTableMock[index] = { ...ServiceContract };
    return [200];
  });

  mock.onDelete(/api\/ServiceContracts\/\d+/).reply(config => {
    const id = config.url.match(/api\/ServiceContracts\/(\d+)/)[1];
    const index = ServiceContractTableMock.findIndex(el => el.id === +id);
    ServiceContractTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = ServiceContractTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
