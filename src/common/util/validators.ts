/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {longerThan, noInvalidCharacters, notEmpty, shorterThan} from "./validationUtils"

export const usernameValidator = [
    {fun: notEmpty, message: "Username can't be empty"},
    {fun: noInvalidCharacters(), message: "Please don't use unicode characters that break display. Thank you."},
    {fun: longerThan(2), message: "Must be at least 3 characters long"},
    {fun: shorterThan(25), message: "Must be 18 characters or less"}
]
