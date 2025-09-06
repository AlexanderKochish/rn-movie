export type FAQQuestionType = {
    id: string;
    question: string;
    answer: string;
    category_id: string;
};

export type FAQCategoryType = {
    id: string;
    name: string;
    icon: string;
    description: string;
};
