interface article {
    id: number;
    author_id: number;
    title: string;
    content: string;
    cover: string;
    cre_time: number;
    author_name: string;
}

interface articleList {
    articles: article[];
}

