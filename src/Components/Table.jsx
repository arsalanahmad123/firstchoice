import React from 'react'

const Table = () => {
    return (
        <div className='overflow-x-auto bg-bgLight max-h-[80vh] mx-5 mt-5 rounded-md'>
            <table className='table table-md  text-white '>
                <thead>
                    <tr className='bg-white'>
                        <th></th>
                        <th>Invoice ID</th>
                        <th>Company</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
                        <td>Canada</td>
                        <td>12/16/2020</td>
                        <td>Blue</td>
                    </tr>

                    <tr>
                        <th>11</th>
                        <td>Andy Tipple</td>
                        <td>Librarian</td>
                        <td>Hilpert Group</td>
                        <td>Poland</td>
                        <td>7/9/2020</td>
                        <td>Indigo</td>
                    </tr>
                    <tr>
                        <th>12</th>
                        <td>Sophi Biles</td>
                        <td>Recruiting Manager</td>
                        <td>Gutmann Inc</td>
                        <td>Indonesia</td>
                        <td>2/12/2021</td>
                        <td>Maroon</td>
                    </tr>
                    <tr>
                        <th>13</th>
                        <td>Florida Garces</td>
                        <td>Web Developer IV</td>
                        <td>Gaylord, Pacocha and Baumbach</td>
                        <td>Poland</td>
                        <td>5/31/2020</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <th>14</th>
                        <td>Maribeth Popping</td>
                        <td>Analyst Programmer</td>
                        <td>Deckow-Pouros</td>
                        <td>Portugal</td>
                        <td>4/27/2021</td>
                        <td>Aquamarine</td>
                    </tr>
                    <tr>
                        <th>15</th>
                        <td>Moritz Dryburgh</td>
                        <td>Dental Hygienist</td>
                        <td>Schiller, Cole and Hackett</td>
                        <td>Sri Lanka</td>
                        <td>8/8/2020</td>
                        <td>Crimson</td>
                    </tr>
                    <tr>
                        <th>16</th>
                        <td>Reid Semiras</td>
                        <td>Teacher</td>
                        <td>Sporer, Sipes and Rogahn</td>
                        <td>Poland</td>
                        <td>7/30/2020</td>
                        <td>Green</td>
                    </tr>
                    <tr>
                        <th>17</th>
                        <td>Alec Lethby</td>
                        <td>Teacher</td>
                        <td>Reichel, Glover and Hamill</td>
                        <td>China</td>
                        <td>2/28/2021</td>
                        <td>Khaki</td>
                    </tr>
                    <tr>
                        <th>18</th>
                        <td>Aland Wilber</td>
                        <td>Quality Control Specialist</td>
                        <td>Kshlerin, Rogahn and Swaniawski</td>
                        <td>Czech Republic</td>
                        <td>9/29/2020</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <th>19</th>
                        <td>Teddie Duerden</td>
                        <td>Staff Accountant III</td>
                        <td>Pouros, Ullrich and Windler</td>
                        <td>France</td>
                        <td>10/27/2020</td>
                        <td>Aquamarine</td>
                    </tr>
                    <tr>
                        <th>20</th>
                        <td>Lorelei Blackstone</td>
                        <td>Data Coordiator</td>
                        <td>Witting, Kutch and Greenfelder</td>
                        <td>Kazakhstan</td>
                        <td>6/3/2020</td>
                        <td>Red</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table
