import React from "react";
// import "../components/ReportDetails.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

const ReportDetails = () => {
  const exportToPDF = () => {
    const doc = new jsPDF("portrait", "px", "a4");

    const printReportElement = document.querySelector(".print-report");

    html2canvas(printReportElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save("report.pdf");
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <h4 className="p-3 " style={{ fontSize: "18px" }}>
            Project Id :1 report
          </h4>
        </div>
        <div className="ms-auto col-auto">
          <button className="btn btn-success  p-3 m-2" onClick={exportToPDF}>
            Export to PDF
          </button>
        </div>
      </div>
      <div className="print-report">
        <hr></hr>
        <h3 className="ms-2 text-center">Project Details </h3>
        <div className="table-responsive container">
          <table
            class="table table-bordered table-striped table-hover"
            style={{ width: "700px" }}
          >
            <tbody>
              <tr>
                <th class="col-4">Project Id</th>
                <td class="col-8">1</td>
              </tr>
              <tr>
                <th class="col-4">Project Name</th>
                <td class="col-8">Project Management Tool</td>
              </tr>
              <tr>
                <th class="col-4">Description</th>
                <td class="col-8">
                  The objective of a Project Management Tool is to provide a
                  centralized platform for project managers and team members to
                  collaborate, organize, and track their project activities.
                </td>
              </tr>
              <tr>
                <th class="col-4">Assigned To</th>
                <td class="col-8">
                  <ul class="list-unstyled">
                    <li>user1</li>
                    <li>user2</li>
                    <li>user3</li>
                    <li>user4</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th class="col-4">Completed Task</th>
                <td class="col-8">4</td>
              </tr>
              <tr>
                <th class="col-4">Total Task</th>
                <td class="col-8">8</td>
              </tr>
              <tr>
                <th class="col-4">Start Date</th>
                <td class="col-8">10/01/2023</td>
              </tr>
              <tr>
                <th class="col-4">End Date</th>
                <td class="col-8">10/05/2023</td>
              </tr>
              <tr>
                <th class="col-4">Status</th>
                <td class="col-8">Started</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-center">Task Details</h3>
        <div className="table-responsive container">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th className="col-1 bg-info text-white">Task Id</th>
                <th className="col-2 bg-info text-white">Task Name</th>
                <th className="col-4 bg-info text-white">Description</th>
                <th className="col-2 bg-info text-white">Assigned To</th>
                <th className="col-1 bg-info text-white">Priority</th>
                <th className="col-1 bg-info text-white">Deadline</th>
                <th className="col-1 bg-info text-white">Task Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>11</td>
                <td>create report page</td>
                <td>description</td>
                <td>shiva</td>
                <td>high</td>
                <td>02/05/2023</td>
                <td>started</td>
              </tr>
              <tr>
                <td>12</td>
                <td>create report page</td>
                <td>description</td>
                <td>shiva</td>
                <td>high</td>
                <td>02/05/2023</td>
                <td>started</td>
              </tr>
              <tr>
                <td>13</td>
                <td>create report page</td>
                <td>description</td>
                <td>shiva</td>
                <td>high</td>
                <td>02/05/2023</td>
                <td>started</td>
              </tr>
              <tr>
                <td>14</td>
                <td>create report page</td>
                <td>description</td>
                <td>shiva</td>
                <td>high</td>
                <td>02/05/2023</td>
                <td>started</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
