export const normalizeInvestors = (data) => {
  if (data) {
    const investorData = data.investor.map((inv) => {
      const investmentsArray = inv.investments.map(
        (investment) => investment.company.name
      );
      const investor = {
        name: inv.name,
        thumbnail: inv.photo_thumbnail,
        id: inv.id,
        elementData: investmentsArray,
      };

      return investor;
    });

    return {
      data: investorData,
      totalCount: data.investor_aggregate.aggregate.count,
    };
  }
};

export const normalizeCompanies = (data) => {
  if (data) {
    const companyData = data.company.map((item) => {
      const investorsArray = item.investments.map(
        (investment) => investment.investor.name
      );
      const company = {
        name: item.name,
        id: item.id,
        elementData: investorsArray,
      };
      return company;
    });

    return {
      data: companyData,
      totalCount: data.company_aggregate.aggregate.count,
    };
  }
};
