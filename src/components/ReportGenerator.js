// import React, { useState } from 'react';
// import { Button, Menu, MenuItem } from '@mui/material';
// import { Assessment } from '@mui/icons-material';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';

// const ReportGenerator = ({ tickets }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const generatePDFReport = (reportType) => {
//     const doc = new jsPDF();
    
//     // Añadir logo
//     const logoUrl = 'https://www.cbvision.net.ec/wp-content/uploads/2023/10/cbvision-logo@1x-sticky.png';
//     doc.addImage(logoUrl, 'PNG', 10, 10, 50, 20);
    
//     doc.setFontSize(18);
//     doc.text(`Reporte de Tickets - ${reportType}`, 14, 40);

//     let tableData = [];
//     let columns = [];

//     switch (reportType) {
//       case 'general':
//         columns = [
//           { header: 'ID', dataKey: 'id' },
//           { header: 'Título', dataKey: 'title' },
//           { header: 'Estado', dataKey: 'status' },
//           { header: 'Solicitante', dataKey: 'requester_name' },
//           { header: 'Creado', dataKey: 'created_at' }
//         ];
//         tableData = tickets.map(ticket => ({
//           id: ticket.id,
//           title: ticket.title,
//           status: ticket.status,
//           requester_name: ticket.requester_name,
//           created_at: new Date(ticket.created_at).toLocaleDateString()
//         }));
//         break;
//       case 'porEstado':
//         columns = [
//           { header: 'Estado', dataKey: 'status' },
//           { header: 'Cantidad', dataKey: 'count' }
//         ];
//         const statusCounts = tickets.reduce((acc, ticket) => {
//           acc[ticket.status] = (acc[ticket.status] || 0) + 1;
//           return acc;
//         }, {});
//         tableData = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
//         break;
//       case 'porSucursal':
//         columns = [
//           { header: 'Sucursal', dataKey: 'agency_name' },
//           { header: 'Cantidad', dataKey: 'count' }
//         ];
//         const sucursalCounts = tickets.reduce((acc, ticket) => {
//           acc[ticket.agency_name] = (acc[ticket.agency_name] || 0) + 1;
//           return acc;
//         }, {});
//         tableData = Object.entries(sucursalCounts).map(([agency_name, count]) => ({ agency_name, count }));
//         break;
//     }

//     doc.autoTable({
//       columns: columns,
//       body: tableData,
//       startY: 50,
//     });

//     doc.save(`reporte_tickets_${reportType}.pdf`);
//   };

//   const generateExcelReport = (reportType) => {
//     let data = [];

//     switch (reportType) {
//       case 'general':
//         data = tickets.map(ticket => ({
//           ID: ticket.id,
//           Título: ticket.title,
//           Estado: ticket.status,
//           Solicitante: ticket.requester_name,
//           Creado: new Date(ticket.created_at).toLocaleDateString()
//         }));
//         break;
//       case 'porEstado':
//         const statusCounts = tickets.reduce((acc, ticket) => {
//           acc[ticket.status] = (acc[ticket.status] || 0) + 1;
//           return acc;
//         }, {});
//         data = Object.entries(statusCounts).map(([status, count]) => ({ Estado: status, Cantidad: count }));
//         break;
//       case 'porSucursal':
//         const sucursalCounts = tickets.reduce((acc, ticket) => {
//           acc[ticket.agency_name] = (acc[ticket.agency_name] || 0) + 1;
//           return acc;
//         }, {});
//         data = Object.entries(sucursalCounts).map(([agency_name, count]) => ({ Sucursal: agency_name, Cantidad: count }));
//         break;
//     }

//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Reporte");
//     XLSX.writeFile(wb, `reporte_tickets_${reportType}.xlsx`);
//   };

//   const generateReport = (reportType) => {
//     generatePDFReport(reportType);
//     generateExcelReport(reportType);
//     handleClose();
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<Assessment />}
//         onClick={handleClick}
//       >
//         Generar Reporte
//       </Button>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={() => generateReport('general')}>Reporte General</MenuItem>
//         <MenuItem onClick={() => generateReport('porEstado')}>Reporte por Estado</MenuItem>
//         <MenuItem onClick={() => generateReport('porSucursal')}>Reporte por Sucursal</MenuItem>
//       </Menu>
//     </>
//   );
// };

// export default ReportGenerator;

import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Assessment } from '@mui/icons-material';

import jsPDF from 'jspdf';

import 'jspdf-autotable';

const ReportGenerator = ({ tickets }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const generatePDFReport = (reportType) => {
    const doc = new jsPDF();
    
    // Añadir logo
    // const logoUrl = '../cbvision-logo.png';
    // doc.addImage(logoUrl, 'PNG', 10, 10, 50, 20);
    
    // Título del reporte
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text(`Reporte de Tickets - ${reportType}`, doc.internal.pageSize.width / 2, 40, { align: 'center' });

    // Fecha del reporte
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.width - 10, 10, { align: 'right' });

    // Resumen
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total de tickets: ${tickets.length}`, 10, 60);
    
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
    const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
    const closedTickets = tickets.filter(t => t.status === 'closed').length;

    doc.text(`Abiertos: ${openTickets}`, 10, 70);
    doc.text(`En progreso: ${inProgressTickets}`, 10, 80);
    doc.text(`Resueltos: ${resolvedTickets}`, 10, 90);
    doc.text(`Cerrados: ${closedTickets}`, 10, 100);

    let tableData = [];
    let columns = [];

    switch (reportType) {
      case 'general':
        columns = [
          { header: 'ID', dataKey: 'id' },
          { header: 'Título', dataKey: 'title' },
          { header: 'Estado', dataKey: 'status' },
          { header: 'Solicitante', dataKey: 'requester_name' },
          { header: 'Sucursal', dataKey: 'agency_name' },
          { header: 'Creado', dataKey: 'created_at' }
        ];
        tableData = tickets.map(ticket => ({
          id: ticket.id,
          title: ticket.title,
          status: ticket.status,
          requester_name: ticket.requester_name,
          agency_name: ticket.agency_name,
          created_at: new Date(ticket.created_at).toLocaleDateString()
        }));
        break;
      case 'porEstado':
        columns = [
          { header: 'Estado', dataKey: 'status' },
          { header: 'Cantidad', dataKey: 'count' },
          { header: 'Porcentaje', dataKey: 'percentage' }
        ];
        const statusCounts = tickets.reduce((acc, ticket) => {
          acc[ticket.status] = (acc[ticket.status] || 0) + 1;
          return acc;
        }, {});
        tableData = Object.entries(statusCounts).map(([status, count]) => ({ 
          status, 
          count, 
          percentage: ((count / tickets.length) * 100).toFixed(2) + '%'
        }));
        break;
      case 'porSucursal':
        columns = [
          { header: 'Sucursal', dataKey: 'agency_name' },
          { header: 'Cantidad', dataKey: 'count' },
          { header: 'Porcentaje', dataKey: 'percentage' }
        ];
        const sucursalCounts = tickets.reduce((acc, ticket) => {
          acc[ticket.agency_name] = (acc[ticket.agency_name] || 0) + 1;
          return acc;
        }, {});
        tableData = Object.entries(sucursalCounts).map(([agency_name, count]) => ({ 
          agency_name, 
          count, 
          percentage: ((count / tickets.length) * 100).toFixed(2) + '%'
        }));
        break;
    }

    doc.autoTable({
      startY: 110,
      head: [columns.map(col => col.header)],
      body: tableData.map(data => columns.map(col => data[col.dataKey])),
      theme: 'striped',
      headStyles: { fillColor: [0, 102, 204] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }

    doc.save(`reporte_tickets_${reportType}.pdf`);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Assessment />}
        onClick={handleClick}
      >
        Generar Reporte
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { generatePDFReport('general'); handleClose(); }}>Reporte General</MenuItem>
        <MenuItem onClick={() => { generatePDFReport('porEstado'); handleClose(); }}>Reporte por Estado</MenuItem>
        <MenuItem onClick={() => { generatePDFReport('porSucursal'); handleClose(); }}>Reporte por Sucursal</MenuItem>
      </Menu>
    </>
  );
};

export default ReportGenerator;