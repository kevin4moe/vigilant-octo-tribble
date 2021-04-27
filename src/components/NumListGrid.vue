<template>
    <nav class="flex flex-row justify-around mx-auto w-1/2">
        <button
            class="mx-2 text-pink-600"
            @click="changePage(1)"
            v-show="pageIn > 1"
        >
            &#60;&#60;
        </button>
        <button
            class="mx-2 text-pink-400"
            @click="changePage(pageIn - 1)"
            v-show="pageIn > 1"
        >
            &#60;
        </button>
        <button
            class="px-3 py-1 border border-pink-100 rounded-lg"
            :class="pageIn == page ? 'bg-pink-500 text-white' : 'text-pink-500'"
            v-for="(page, index) in pagesArray"
            @click="changePage($event.target.innerText)"
            :key="index"
        >
            {{ page }}
        </button>
        <button
            class="mx-2 text-pink-600"
            @click="changePage(pageIn + 10)"
            v-show="pageIn < lastPage"
        >
            +10
        </button>
        <button
            class="mx-2 text-pink-400"
            @click="changePage(pageIn + 1)"
            v-show="pageIn < lastPage"
        >
            &#62;
        </button>
    </nav>
</template>

<script>
export default {
    name: "NumList",
    props: ["allPagesArray", "viewPagesArray", "currentPage", "lastPage"],
    emits: ["searchPage", "update:viewPagesArray", "update:currentPage"],
    data: function () {
        return {
            pageUntil: this.allPagesArray,
            pagesArray: this.viewPagesArray,
            pageIn: this.currentPage,
        };
    },
    methods: {
        actualPage() {
            var start,
                end = this.lastPage - 3;
            if (this.pageIn > end) {
                start = this.lastPage - 7;
                this.pagesArray = this.pageUntil.slice(start, this.lastPage);
                return true;
            } else if (this.pageIn > 4) {
                start = this.pageIn - 4; // Cuatro numeros contando el actual empezando en la izquierda
                end = this.pageIn + 3; // Tres numeros a la derecha despues del numero actual
                this.pagesArray = this.pageUntil.slice(start, end);
            } else {
                this.pagesArray = this.pageUntil.slice(0, 7);
            }
            this.$emit("update:viewPagesArray", this.pagesArray);
            this.$emit("update:currentPage", this.pageIn);
        },
        changePage(page) {
            this.pageIn = parseInt(page);
            if (this.pageIn < 1) {
                this.pageIn = 1;
                return true;
            } else if (this.pageIn > this.lastPage) {
                this.pageIn = this.lastPage;
                return true;
            }
            this.$emit("searchPage", this.pageIn);
            this.actualPage();
        },
    },
    updated() {
        this.pagesArray = this.viewPagesArray;
        this.pageIn = this.currentPage;
    },
};
</script>
