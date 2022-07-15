import axios, { AxiosResponse } from 'axios';
import { USER_DATA } from '../components/LoginForm';
import { Proizvod } from '../types/model';
import { Page } from '../types/page';
import { axios_instance } from './axios_instance_config';

const DEFAULT_PAGE_SIZE = 30;

export type ProductSortField = "proizvodId" | "nazivProizvoda" | "datumProizvodnje" | "cena" | "trenutnoStanjeZaliha";
  
export type PageProps = {
    page?: number,
    per_page?: number,
    sortBy?: ProductSortField
}

export async function fetchProducts({
    page = 1,
    per_page,
    sortBy
}: PageProps):Promise<Page<Proizvod> | false> {
    try {
        var access_token = getAccessToken();
        page--;
        var response:AxiosResponse<Page<Proizvod>>;
        const requestConfig = {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
        if (!sortBy) response = await axios_instance.get(`api/proizvod/pagination/${page}/${per_page}`,requestConfig);
        else response = await axios_instance.get(`api/proizvod/pagination_and_sort/${page}/${per_page}/${sortBy}`,requestConfig);

        if (response.status == 200) return response.data;
        else return false;
    } catch (ex) {
        console.log(ex);
        return false;
    }
}

export async function searchProducts(idPart: string,namePart: string):Promise<Array<Proizvod> | false> {
    try {
        var access_token = getAccessToken();
        const requestConfig = {
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            params: {
                name: namePart,
                id: idPart
            }
        }
        var response:AxiosResponse<Array<Proizvod>> = await axios_instance.get("api/proizvod/search",requestConfig)

        if (response.status == 200) return response.data;
        else return false;
    } catch (ex) {
        console.log(ex);
        return false;
    }
}

function getAccessToken() {
    var user_data: any = localStorage.getItem(USER_DATA);
    if (!user_data) user_data = sessionStorage.getItem(USER_DATA);
    if (!user_data) throw new Error("User is not logged in - access token not available");
    user_data = JSON.parse(user_data);
    return user_data.tokens["access_token"];
}