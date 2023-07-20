//* Libraries
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";
import { BsCurrencyBitcoin } from "react-icons/bs";

//* Components
import { fetchTickerData } from "../api/dataBinance";

const AgGridTable = () => {
  const [rowData, setRowData] = useState([]);

  // Function to format timestamp to "DD/MM/YYYY" format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetching all the binance data
  const fetchData = async () => {
    try {
      const data = await fetchTickerData();
      setRowData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Assigning columns to the table
  const columnDefs = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Price Change", field: "priceChange" },
    { headerName: "Price Change Percent", field: "priceChangePercent" },
    { headerName: "Weighted Avg Price", field: "weightedAvgPrice" },
    {
      headerName: "Open Time",
      field: "openTime",
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      headerName: "Close Time",
      field: "closeTime",
      valueFormatter: (params) => formatDate(params.value),
    },
    { headerName: "Previous Close Price", field: "prevClosePrice" },
    { headerName: "Bid Price", field: "bidPrice" },
    { headerName: "Ask Price", field: "askPrice" },
    { headerName: "Volume", field: "volume" },
    { headerName: "Ask Quantity", field: "askQty" },
    { headerName: "Bid Quantity", field: "bidQty" },
    { headerName: "Last Quantity", field: "lastQty" },
    { headerName: "Count", field: "count" },
    { headerName: "First Id", field: "firstId" },
    { headerName: "Last Id", field: "lastId" },
    { headerName: "Last Price", field: "lastPrice" },
    { headerName: "Highest Price", field: "highPrice" },
    { headerName: "Lowest Price", field: "lowPrice" },
    { headerName: "Open Price", field: "openPrice" },
    { headerName: "Quote Volume", field: "quoteVolume" },
  ];

  // Table can currently be filtered and sorted
  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  // Pagination configuration
  const paginationPageSize = 10;
  const pagination = true;

  const overlayNoRowsTemplate = `
    <div class="ag-overlay-loading-center">
      <div class="loading-spinner"></div>
    </div>
  `;

  return (
    <div className="flex flex-col justify-center items-center bg-[#2c4634] h-screen">
      <div className="flex gap-2 items-center">
        <BsCurrencyBitcoin size={25} className="text-yellow-200" />
        <h1 className="uppercase text-white text-[38px] font-medium">
          Binance data
        </h1>
        <BsCurrencyBitcoin size={25} className="text-yellow-200" />
      </div>

      <div className="ag-theme-alpine h-[650px] w-full p-12">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          overlayNoRowsTemplate={overlayNoRowsTemplate}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
        />
      </div>
    </div>
  );
};

export default AgGridTable;
